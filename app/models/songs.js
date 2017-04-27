const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const SongSchema = new Schema({
    icon: String,
    title: String,
    artist: String,
    duration: Number,
    url: String,
    tags: Array,
    instrumental: Array,
    numberOfPlay: Number
});

module.exports = mongoose.model('Songs', SongSchema);
