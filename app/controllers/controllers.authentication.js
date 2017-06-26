const jwt         = require('jwt-simple');
const config      = require('../../config/database');
const Admin        = require('../models/admin');

exports.authenticate = function(req, res) {
   Admin.findOne({
     email: req.body.email
   }, function(err, user) {
     if (err) throw err;

     if (!user) {
       res.send({success: false, msg: 'Authentication failed. User not found.'});
     } else {
       // check if password matches
       user.comparePassword(req.body.password, function (err, isMatch) {
         if (isMatch && !err) {
           // if user is found and password is right create a token
           const token = jwt.encode(user, config.secret);
           // return the information including token as JSON
           res.json({success: true, token: 'JWT ' + token, user:user});
         } else {
           res.send({success: false, msg: 'Authentication failed. Wrong password.'});
         }
       });
     }
   });
 };

 exports.createToken = function(req, res){
   const token = jwt.encode(req.params.mail, config.secret);
   res.json(token);
 };

exports.signup =  function(req, res) {
  console.log(req.body);
  let data = req.body;
  data.token = jwt.encode(data.email, config.secret);
  Admin.findOne({
    email: data.email
  }, function(err, user) {
    if (!user){
      if (!data.email || !data.password) {
        res.json({success: false, msg: 'Please pass name and password.'});
      } else {
        const newUser = new Admin(data);
        // save the user
        newUser.save(function(err) {
            if (err) {
              return res.json({success: false, msg: 'email already exists.'});
            }
              return res.json({success: true, msg: 'Successful created new user.'});
        });
      }
    } else {
       res.json({success: false, msg: 'Email already used'});
    }
  });
 };

 exports.memberinfo = function(req, res) {
   const token = getToken(req.headers);
   if (token) {
     const decoded = jwt.decode(token, config.secret);
     Admin.findOne({
       email: decoded.email
     }, function(err, user) {
         if (err) throw err;

         if (!user) {
           return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
         } else {
           return res.json({success: true, msg: 'Welcome in the member area ' + user.email + '!', user: user});
         }
     });
   } else {
     return res.status(403).send({success: false, msg: 'No token provided.'});
   }
 };

 getToken = function (headers) {
  if (headers && headers.authorization) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
