# Use a Python base image
FROM python:latest

# Set the working directory in the container
WORKDIR /app

# Copy your Python script and other necessary files
COPY . .

# Load environment variables from the .env file
ENV CLIENT_ID="_8nO5QsB95hHFxNstUTWcw"
ENV CLIENT_SECRET="a6RN-49DdN9r4q5DlNvQn7nbaHHKrQ"
ENV USER_AGENT="Vibhor_Sharma"
ENV GOOGLE_API_KEY="AIzaSyDbQus67GYsqO6k10dlif8wwoGgdIw2X54"

# Install the required Python libraries
RUN pip install -r requirements.txt

# Command to run your Python script
CMD ["python", "main.py"]

