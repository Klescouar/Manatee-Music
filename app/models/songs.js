const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const SongSchema = new Schema({
    icon: String,
    title: String,
    artist: String,
    duration: Number,
    url: String,
    tags: Array,
    instrumental: Array
});

module.exports = mongoose.model('Songs', SongSchema);
