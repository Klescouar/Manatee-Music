const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const SongSchema = new Schema({
    icon: String,
    title: String,
    filePath: String,
    duration: String,
    ratingSum: Number,
    ratingNumber: Number,
});

module.exports = mongoose.model('Songs', SongSchema);
