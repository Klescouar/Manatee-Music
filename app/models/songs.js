const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const SongSchema = new Schema({
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    tags: {
      type: Array,
      required: true
    },
    instrumental: {
      type: Array,
    },
    numberOfPlay: {
      type: Number,
      required: true
    },
});

module.exports = mongoose.model('Songs', SongSchema);
