const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const AmbianceSchema = new Schema({
    name: {
      type: String,
      required: true
    }
});

module.exports = mongoose.model('Ambiance', AmbianceSchema);
