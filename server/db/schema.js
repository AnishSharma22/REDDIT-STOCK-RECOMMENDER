const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    ShareName : String,
    Remark : String,
    Post_URL : String,
    dailyGain : Number,
    monthlyGain : Number,
    yearlyGain : Number,
    timeFrame : Number
});

const STOCK = mongoose.model('stock', stockSchema);
module.exports = STOCK;
