const config = require('../../config/database');
const Songs = require('../models/songs');
const mongoose = require('mongoose');

exports.getAllSongs = (req, res) => {
    console.log('I received a GET request');
    Songs.find(function(err, songs) {
        if (err) {
            throw err;

        } else {
            res.json(songs);
        }
    });
};

exports.removeSong = (req, res) => {
    console.log('I received a GET request');
    Songs.findOneAndRemove({
        _id: req.params.id
    }, function(err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Song removed!'});
    });
};

exports.removeInstrumentalSong = (req, res) => {
    Songs.findById(req.params.songId, function(err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            const index = doc.instrumental.findIndex(x => x.id == req.params.instrumentalId);
            doc.instrumental.splice(index, 1);

            doc.save(function(err, doc) {
                if (err) {
                    res.status(500).send(err)
                }
                res.send(doc);
            });
        }
    });
};

exports.addSong = function(req, res) {
    if (!req.body.title || !req.body.icon || !req.body.url) {
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

exports.updateNumberOfPlay = function(req, res) {
    Songs.findById(req.params.id, function(err, doc) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (req.params.instrumentalId) {
                const filteredArray = doc.instrumental.filter((element) => {
                    return element.id == req.params.instrumentalId;
                });
                const indexOfInstrumental = doc.instrumental.indexOf(filteredArray[0]);
                doc.instrumental[indexOfInstrumental].numberOfPlay++;
                const instrumentalArray = doc.instrumental;
                console.log(instrumentalArray)
                Songs.update({
                    _id: doc.id
                }, {
                    $set: {
                        instrumental: instrumentalArray
                    }
                }, function(err) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(doc);
                });
            } else {
                doc.numberOfPlay = doc.numberOfPlay + 1,
                doc.save(function(err, doc) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(doc);
                });
            }
        }
    });
};

exports.addInstrumentalSong = function(req, res) {
    if (!req.body.title || !req.body.icon || !req.body.url || !req.body.integral) {
        res.json({success: false, msg: 'Please pass all infos.'});
    } else {
        Songs.findById(req.body.integral, function(err, doc) {
            if (err) {
                res.status(500).send(err);
            } else {
                req.body.id = mongoose.Types.ObjectId();
                doc.instrumental.push(req.body),

                doc.save(function(err, doc) {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.send(doc);
                });
            }
        });
    }
};
