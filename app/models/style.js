const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const StyleSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Style', StyleSchema);
