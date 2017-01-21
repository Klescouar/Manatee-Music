const config      = require('../../config/database');
const Ambiance = require('../models/ambiance');

exports.getAllAmbiance = (req, res) => {
    console.log('I received a GET request');
    Ambiance.find( function(err, ambiance) {
        if (err) throw err;

        else {
          res.json(ambiance);
        }
    });
};

exports.removeAmbiance = (req, res) => {
    console.log('I received a GET request');
    Ambiance.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Song removed!' });
    });
};


exports.addAmbiance =  function(req, res) {
  console.log(req.body.name);
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newAmbiance = new Ambiance(req.body);
     // save the user
     newAmbiance.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'song already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Song.'});
     });
   }
 };
