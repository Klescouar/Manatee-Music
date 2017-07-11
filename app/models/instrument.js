const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const InstrumentSchema = new Schema({
    name: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Instrument', InstrumentSchema);
