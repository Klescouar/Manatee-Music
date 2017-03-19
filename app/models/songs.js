const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const SongSchema = new Schema({
    icon: String,
    title: String,
    artist: String,
    url: String,
    duration: String,
    ratingSum: Number,
    ratingNumber: Number,
    ambiance: Array,
    style: Array,
    instrument: Array
});

module.exports = mongoose.model('Songs', SongSchema);
