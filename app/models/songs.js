const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const SongSchema = new Schema({
    icon: String,
    title: String,
    filePath: String,
});

module.exports = mongoose.model('Songs', SongSchema);
