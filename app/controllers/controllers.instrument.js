const config      = require('../../config/database');
const Instrument = require('../models/instrument');

exports.getAllInstrument = (req, res) => {
    console.log('I received a GET request');
    Instrument.find( function(err, instrument) {
        if (err) throw err;

        else {
          res.json(instrument);
        }
    });
};

exports.removeInstrument = (req, res) => {
    console.log('I received a GET request');
    Instrument.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Song removed!' });
    });
};


exports.addInstrument =  function(req, res) {
  console.log(req.body);
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newInstrument = new Instrument(req.body);
     // save the user
     newInstrument.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'song already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Song.'});
     });
   }
 };
