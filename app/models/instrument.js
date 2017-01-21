const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const InstrumentSchema = new Schema({
    name: String,
});

module.exports = mongoose.model('Instrument', InstrumentSchema);
