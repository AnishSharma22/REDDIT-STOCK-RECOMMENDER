import praw
import pandas as pd
import os
import time
import schedule
import random
import re
import google.generativeai as genai
import yfinance as yf
from datetime import datetime, timedelta
import multiprocessing as mp 
from dotenv import load_dotenv

load_dotenv()


client_id = os.environ.get('CLIENT_ID')
client_secret = os.environ.get('CLIENT_SECRET')
google_api_key = os.environ.get('GOOGLE_API_KEY')
user_agent = os.environ.get('USER_AGENT')

def makeData(timeframe, shared_dict, shared_value):
    '''
    Create data for each time frame
    :param timeframe: The time frame for which data is to be created
    :param timeframe: The time frame for which data is to be created
    :return: None
    '''

    # Declaration of APIs
    genai.configure(api_key=google_api_key)
    model = genai.GenerativeModel('gemini-pro')

    # Initialize Reddit API instance (assuming you have proper credentials)
    reddit_read_only = praw.Reddit(client_id=client_id,		 # your client id
    							client_secret=client_secret,	 # your client secret
    							user_agent=user_agent)	 # your user agent


    
    start_time = time.time()
    # Number of posts
    timedic = {
        "day":100, 'week':110,'month':110,'year':400
    }
    # Number mapping
    timedic2 = {
        "day":1, 'week':2,'month':3,'year':4
    }
    # Conflict timing
    timedic3 = {
        "day":2.1, 'week':4.2,'month':6.3,'year':8.4
    }

    # Dictionary to store top posts for each subreddit
    posts_dict = {"Title": [],  "Flair": [], "Post Text": [],
                  "ID": [], "Score": [],
                  "Total Comments": [], "Post_URL": []
                  }

    subreddits = ["wallstreetbets", "StockMarket", "Stocks", "Investing", "RobinHood"]

    # Iterate over each subreddit
    for subreddit_name in subreddits:
        # Get subreddit object
        subreddit = reddit_read_only.subreddit(subreddit_name)

        # Retrieve top 5 posts for the specified time filter
        posts = subreddit.top(time_filter=timeframe, limit=timedic[timeframe])

        for post in posts:
            posts_dict["Title"].append(post.title)
            posts_dict["Flair"].append(post.link_flair_text)
            posts_dict["Post Text"].append(post.selftext)
            posts_dict["ID"].append(post.id)
            posts_dict["Score"].append(post.score)
            posts_dict["Total Comments"].append(post.num_comments)
            posts_dict["Post_URL"].append(post.url)

    # Scraping done
    # Data manipulation begins 

    # Saving the data in a pandas dataframe
    posts_dict = pd.DataFrame(posts_dict)
    print(posts_dict)

    # top_posts.to_csv("data/rev.csv", index=True)

    # Sort posts according to flairs and store them
    df = posts_dict
    Discussion = df.loc[(df["Flair"] == "Discussion"),  

                   ["Title","Flair","Post Text","ID","Post_URL"]]

    Tech = df.loc[(df["Flair"] == "Technical Analysis"),  

                   ["Title","Flair","Post Text","ID","Post_URL"]]

    Comp = df.loc[(df["Flair"] == "Company Discussion"),  

                   ["Title","Flair","Post Text","ID","Post_URL"]]

    CompA = df.loc[(df["Flair"] == "Company Analysis"),  

                   ["Title","Flair","Post Text","ID","Post_URL"]]

    result = pd.concat([Discussion, Tech, Comp, CompA], ignore_index=True)
    df = result

    # Drop null values
    df = df.dropna(how='any')


    print(df.shape[0])

    # text = df["Post Text"]
    # print(text)
    # print(df["Post Text"])
    # i = 0

    # Declare all essential data attributes for final dataframe
    remark = []
    # confidence = []
    sname = []
    dailyGain = []
    monthlyGain = []
    yearlyGain = []
    timeFrame = []
    posturl = []

    # Get rid of empty post texts as their bias is not determinable
    for index, row in df.iterrows():
        if pd.isnull(row["Post Text"]) or row["Post Text"] == "":
            df.drop(index, inplace=True)

    # Set today's date and other dates
    end_date = datetime.today().strftime('%Y-%m-%d')
    start_date_one_year_before = (datetime.today() - timedelta(days=350)).strftime('%Y-%m-%d')

    def is_valid_stock_symbol(symbol):
        '''
        Check if a stock symbol is valid
        :param symbol: The stock symbol to check
        :return: True if the symbol is valid, False otherwise
        '''
        # Define a regular expression pattern for a common stock symbol
        pattern = re.compile(r'^[A-Z0-9\-]+$')

        # Check if the symbol matches the pattern
        return bool(pattern.match(symbol))

    maxTries = 5
    # Iterate over each post in the dataframe
    for index, row in df.iterrows():
        '''
        Process each post in the dataframe
        Produces final dataframe when completed
        '''
        TEXT = row['Post Text']
        if len(dailyGain)>=12:
            break

        def exponential_backoff(retries, max_retries=5):
            '''
            Manages API resource conflict
            :param retries: The number of retries so far
            :param max_retries: The maximum number of retries allowed
            :return: The number of retries after the backoff
            '''
            # waitTime = random.uniform(0.2,10)
            waitTime = timedic3[timeframe]
            print(f'API resource exhaused. Sleeping for {waitTime}. Retry number: {retries}')
            time.sleep(waitTime)
            return retries + 1 if retries < max_retries else None

        def queueBackoff(retries, max_retries=maxTries):
            '''
            Manages API conflict
            :param retries: The number of retries so far
            :param max_retries: The maximum number of retries allowed
            :return: The number of retries after the backoff
            '''
            with shared_value.get_lock():
                # shared_value.value += 1
                print(f'API resource exhaused for process: {timeframe}. Retry number: {retries}')
                time.sleep(shared_value.value)
                # shared_value.value -= 1
            
            return retries + 1 if retries < max_retries else None

        retries = 0
        while retries is not None:
            try:
                # Your Google Cloud API call here
                # If it fails due to 429 error, it will retry with a fixed backoff
                response = model.generate_content(TEXT + ''' Which stock is this paragraph majorly focussing upon? Reply to this prompt in a word strictly with the name of the stock's NASDAQ symbol only. If there is no stock clearly mentioned or the paragraph is not about any stock prediction, reply "N/A". Under no circumstances you are allowed to reply with more than one word or in any other way. Also check if the symbol is correct or not. Do not reply with incorrect symbols (you can reply with N/A instead).''')
                # ...
                # If successful, set retries to None to exit the loop
                retries = None
            except Exception as e:
                if retries==maxTries:
                    print('TRIAL SKIPPED')
                    break
                # retries = exponential_backoff(retries)
                retries = queueBackoff(retries)

        # Move to next iteration to avoid conflict
        if retries==maxTries:
            continue


        # print(response.prompt_feedback)
        # print(response.prompt_feedback.block_reason)
        #  or "text" not in response.parts

        if response.prompt_feedback.block_reason or not response:
            continue
        if not response.parts:
            print('not response.parts')
            continue
        
        stock_symbol = (response.text).strip()
        print(stock_symbol)
        if is_valid_stock_symbol(stock_symbol):
            try:
                response = model.generate_content(TEXT + ''' You can only reply "Positive" or "Negative" to this prompt. Under no circumstances, you are allowed to reply with more than one word or in any other way. Reply "Positive" if outlook of the stock or share price this text talks about is positive, otherwise reply "Negative". ''')
                r1 = response.text

                if stock_symbol in shared_dict:
                    dailyGain.append(shared_dict[stock_symbol][0])
                    monthlyGain.append(shared_dict[stock_symbol][1])
                    yearlyGain.append(shared_dict[stock_symbol][2])
                    timeFrame.append(timedic2[timeframe])
                    remark.append(r1)
                    sname.append(stock_symbol)
                    posturl.append(row['Post_URL'])
                    print('CACHE HIT !!!')
                    continue

                stock_data = yf.download(stock_symbol, start=start_date_one_year_before, end=end_date)
                stock_data.reset_index(inplace=True)
                stock_data.set_index('Date', inplace=True)


                cy = stock_data['Adj Close'].iloc[0]
                cm = stock_data['Adj Close'].iloc[-21]
                cd = stock_data['Adj Close'].iloc[-2]
                cp = stock_data['Adj Close'].iloc[-1]


                dailyGain.append(((cp-cd)/cd)*100)
                monthlyGain.append(((cp-cm)/cm)*100)
                yearlyGain.append(((cp-cy)/cy)*100)
                timeFrame.append(timedic2[timeframe])
                remark.append(r1)
                sname.append(stock_symbol)
                posturl.append(row['Post_URL'])

                shared_dict[stock_symbol] = [((cp-cd)/cd)*100, ((cp-cm)/cm)*100, ((cp-cy)/cy)*100]

            except Exception as e:
                print(f'No data found on {stock_symbol}, or ', e)
        else:
            pass


    df2 = pd.DataFrame()
    df2["ShareName"] = sname
    df2["Remark"] = remark
    df2["Post_URL"] = posturl
    df2["dailyGain"] = dailyGain
    df2["monthlyGain"] = monthlyGain
    df2["yearlyGain"] = yearlyGain
    df2["timeFrame"] = timeFrame

    df2.to_csv('combined_data.csv', mode='a', header=not os.path.exists('combined_data.csv'), index=False)
    json_file = 'combined_data.json'

    if not os.path.exists(json_file):
        df2.to_json(json_file, orient='records', lines=True)
    else:
        with open(json_file, 'a', encoding='utf-8') as f:
            df2.to_json(f, orient='records', lines=True)


    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Time taken: for {timeframe} is {elapsed_time} seconds")


def main():
    genai.configure(api_key=google_api_key)
    model = genai.GenerativeModel('gemini-pro')

    # Initialize Reddit API instance (assuming you have proper credentials)
    reddit_read_only = praw.Reddit(client_id=client_id,		 # your client id
    							client_secret=client_secret,	 # your client secret
    							user_agent=user_agent)	 # your user agent
    
    file_path = 'combined_data.csv'
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"The file '{file_path}' has been deleted.")
    else:
        print(f"The file '{file_path}' does not exist, nothing to delete.")
    
    file_path = 'combined_data.json'
    if os.path.exists(file_path):
        os.remove(file_path)
        print(f"The file '{file_path}' has been deleted.")
    else:
        print(f"The file '{file_path}' does not exist, nothing to delete.")
    
    manager = mp.Manager()
    shared_dict = manager.dict()

    shared_value = mp.Value('f', 9)

    p1 = mp.Process(target=makeData, args=['day', shared_dict, shared_value])
    p2 = mp.Process(target=makeData, args=['week', shared_dict, shared_value])
    p3 = mp.Process(target=makeData, args=['month', shared_dict, shared_value])
    p4 = mp.Process(target=makeData, args=['year', shared_dict, shared_value])
    processes = [p1,p2,p3,p4]

    processTime = time.time()

    for p in processes:
        p.start()
    
    for p in processes:
        p.join()
    
    df2 = pd.read_csv('combined_data.csv')
    df2.sort_values(by=['timeFrame', 'Remark', 'yearlyGain'], ascending=[True, False, False], inplace=True)
    print(df2.shape)

    df2.to_csv('combined_data.csv', index=False)
    df2.to_json('combined_data.json', orient='records', lines=True)

    processEndTime = time.time()
    print('Total Time Taken: ', processEndTime-processTime)
    
def run_schedule():
    # Run main function immediately
    main()

    # Schedule the main function to run every day at 11 PM
    schedule.every().day.at("23:00").do(main)

    # Continuously run the scheduler
    while True:
        schedule.run_pending()
        time.sleep(1800)

if __name__ == "__main__":
    run_schedule()
