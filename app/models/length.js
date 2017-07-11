const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const LengthSchema = new Schema({
    name: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Length', LengthSchema);
