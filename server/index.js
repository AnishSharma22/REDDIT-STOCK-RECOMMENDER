const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require('node-cron');
const fs = require("fs");
const cors = require("cors");
const readline = require("readline");
const dotenv = require("dotenv");
const path = require("path");
const STOCK = require("./db/schema");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const MONGO_URI = process.env.MONGO_URI;
const mongo_uri = MONGO_URI;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;

// Connect to MongoDB
async function connectToDB() {
  try {
    await mongoose.connect(mongo_uri, {
      dbName: "stock",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }  
}

connectToDB();

app.get("/backend/api", async (req, res) => {
  const timeFrame = req.query.timeFrame;

  try {
    let data;
    if (timeFrame === "daily") {
      data = await STOCK.find({ timeFrame: 1 });
      res.send(data); // Sending response here for daily timeframe
    } else if (timeFrame === "weekly") {
      data = await STOCK.find({ timeFrame: 2 });
      res.send(data); // Sending response here for monthly timeframe
    } else if (timeFrame === "monthly") {
      data = await STOCK.find({ timeFrame: 3 });
      res.send(data); // Sending response here for monthly timeframe
    } else if (timeFrame === "yearly") {
      data = await STOCK.find({ timeFrame: 4 });
      res.send(data); // Sending response here for yearly timeframe
    } else {
      return res.status(400).json({ error: "Invalid time frame" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});

const function1 = async () => {
  try {
    try {
      await STOCK.deleteMany({});
      console.log("All Data deleted successfully from the database!");
    
      // Read the combined.json file from /output
      const fileStream = fs.createReadStream('/usr/src/app/output/combined_data.json');
    
      const rl = readline.createInterface({
        input: fileStream,
        output: process.stdout,
        terminal: false,
      });
    
      let count = 0;
    
      for await (const line of rl) {
        try {
          const data = JSON.parse(line);
          const freshData = new STOCK(data);
          await freshData.save();
          console.log('Data saved to MongoDB');
          count++;
        } catch (error) {
          console.error('Error saving data:', error);
        }
      }
    
      console.log(`Processed ${count} lines.`);
      console.log("All Data added successfully to the database!");
      
      rl.close(); // Close the readline interface after processing
    } catch (error) {
      console.error('Error:', error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}
    

setTimeout(function1,300000);

cron.schedule('0 0 * * *', async () => { 
  function1();
});

