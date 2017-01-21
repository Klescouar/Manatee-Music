const config      = require('../../config/database');
const Style = require('../models/style');

exports.getAllStyle = (req, res) => {
    console.log('I received a GET request');
    Style.find( function(err, style) {
        if (err) throw err;

        else {
          res.json(style);
        }
    });
};

exports.removeStyle = (req, res) => {
    console.log('I received a GET request');
    Style.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Song removed!' });
    });
};


exports.addStyle =  function(req, res) {
   if (!req.body.name) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newStyle = new Style(req.body);
     // save the user
     newStyle.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'song already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Song.'});
     });
   }
 };
