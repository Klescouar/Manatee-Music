const config      = require('../../config/database');
const Length = require('../models/length');

exports.getAllLength = (req, res) => {
    console.log('I received a GET request');
    Length.find( function(err, length) {
        if (err) throw err;

        else {
          res.json(length);
        }
    });
};

exports.removeLength = (req, res) => {
    console.log('I received a GET request');
    Length.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Song removed!' });
    });
};


exports.addLength =  function(req, res) {
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newLength = new Length(req.body);
     // save the user
     newLength.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'song already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Song.'});
     });
   }
 };
