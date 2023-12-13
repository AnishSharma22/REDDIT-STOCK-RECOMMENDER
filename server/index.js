const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { exec } = require('child_process');
const cors = require('cors');


const app = express();
app.use(bodyParser.json());
app.use(cors());


const port = 3000;

// Connect to MongoDB
async function connectToDB() {
    try {
        await mongoose.connect('mongodb+srv://anish:Anish2003%40@cluster0.tdw5urf.mongodb.net/stock', {
            dbName: 'stock'
        });
        console.log('Connected to MongoDB');

        // const ShareName = "Apple";
        // const remark = "negative";
        // const link = "whatever the link is";
        // const dailyGain = 1;
        // const monthlyGain = -3;
        // const yearlyGain = -35;
        // const timeFrame = 1;

        // const object = new STOCK({ShareName,remark,link,dailyGain,monthlyGain,yearlyGain,timeFrame});
        // await object.save();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectToDB();


// Import STOCK model (assuming it's done in './db/schema')
const STOCK = require('./db/schema');

cron.schedule('0 0 * * *', async () => {
  try {
      await STOCK.deleteMany({});
      console.log('Entries deleted successfully');

      // Run Python script using child_process
      exec('python your_script.py', (error, stdout, stderr) => {
          if (error) {
              console.error(`Error executing Python script: ${error.message}`);
              return;
          }
          if (stderr) {
              console.error(`Python script execution stderr: ${stderr}`);
              return;
          }
          console.log(`Python script executed successfully: ${stdout}`);
      });
  } catch (error) {
      console.error('Error deleting entries:', error);
  }
});
// Endpoint to fetch data based on time frame
app.get('/backend/api', async (req, res) => {
  const timeFrame = req.query.timeFrame;

  try {
      let data;
      if (timeFrame === 'daily') {
          data = await STOCK.find({ timeFrame: 1 });
          res.send(data); // Sending response here for daily timeframe
      }
       else if (timeFrame === 'weekly') {
        data = await STOCK.find({ timeFrame: 2 });
        res.send(data); // Sending response here for monthly timeframe
        }
      else if (timeFrame === 'monthly') {
          data = await STOCK.find({ timeFrame: 3 });
          res.send(data); // Sending response here for monthly timeframe
      } else if (timeFrame === 'yearly') {
          data = await STOCK.find({ timeFrame: 4 });
          res.send(data); // Sending response here for yearly timeframe
      } else {
          return res.status(400).json({ error: 'Invalid time frame' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Server error' });
  }
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
