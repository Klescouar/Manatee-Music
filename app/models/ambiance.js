const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const AmbianceSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Ambiance', AmbianceSchema);
