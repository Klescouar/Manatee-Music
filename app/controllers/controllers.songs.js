const config      = require('../../config/database');
const Songs = require('../models/songs');

exports.getAllSongs = (req, res) => {
    console.log('I received a GET request');
    Songs.find( function(err, songs) {
        if (err) throw err;

        else {
          res.json(songs);
        }
    });
};

exports.removeSong = (req, res) => {
    console.log('I received a GET request');
    Songs.findOneAndRemove({ _id: req.params.id}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Song removed!' });
    });
};


exports.addSong =  function(req, res) {
   if (!req.body.title || !req.body.icon || !req.body.filePath) {
     res.json({success: false, msg: 'Please pass all infos.'});
   } else {
     const newSongs = new Songs(req.body);
     // save the user
     newSongs.save(function(err) {
       if (err) {
         return res.json({success: false, msg: 'song already exists.'});
       }
       res.json({success: true, msg: 'Successful Add Song.'});
     });
   }
 };
