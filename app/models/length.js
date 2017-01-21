const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const LengthSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Length', LengthSchema);
