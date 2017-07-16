const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const path        = require('path');
const multer  =   require('multer');
const mongoose    = require('mongoose');
const jwt         = require('jwt-simple');
const passport = require('passport');

const config      = require(__dirname + '/config/database');
const songs       = require(__dirname + '/app/controllers/controllers.songs');
const uploadPhoto = require(__dirname + '/app/controllers/controllers.upload.photo');
const uploadSong  = require(__dirname + '/app/controllers/controllers.upload.music');
const ambiance    = require(__dirname + '/app/controllers/controllers.ambiance');
const style       = require(__dirname + '/app/controllers/controllers.style');
const length      = require(__dirname + '/app/controllers/controllers.length');
const instrument  = require(__dirname + '/app/controllers/controllers.instrument');
const auth  = require(__dirname + '/app/controllers/controllers.authentication');
const mail  = require(__dirname + '/app/controllers/controllers.mail');

const apiRoutes   = express.Router();
const port        = process.env.PORT || 6868;
require(__dirname + '/config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

// configuration de l'app
app.use(function(request, response, next){
 response.setHeader('Access-Control-Allow-Origin', '*');
 response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
 response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
 next();
});

// connect to database
const database = config.database;
mongoose.connect(database);

app.use('/api', apiRoutes);
app.use(morgan('dev'));
app.use(express.static('dist'));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/app/index.html'));
});
// app.get('/admin', function(req, res) {
//   res.sendFile(path.join(__dirname, '/dist/app/admin.html'));
// });

/////////////////////////AUTH CONTROLLER/////////////////////////
apiRoutes.post('/signin', auth.authenticate);
apiRoutes.post('/signup', auth.signup);

/////////////////////////SONG CONTROLLER/////////////////////////
apiRoutes.get('/songs', songs.getAllSongs);
apiRoutes.post('/songs', passport.authenticate('jwt', {session: false}), songs.addSong);
apiRoutes.put('/songs/:id', songs.updateNumberOfPlay);
apiRoutes.put('/songs/:id/:instrumentalId', songs.updateNumberOfPlay);
apiRoutes.post('/instrumentals', songs.addInstrumentalSong);
apiRoutes.delete('/instrumentals/:songId/:instrumentalId', passport.authenticate('jwt', {session: false}), songs.removeInstrumentalSong);
apiRoutes.delete('/songs/:id', passport.authenticate('jwt', {session: false}), songs.removeSong);

/////////////////////////AMBIANCE FILTER CONTROLLER/////////////////////////
apiRoutes.get('/ambiances', ambiance.getAllAmbiance);
apiRoutes.post('/ambiances', passport.authenticate('jwt', {session: false}), ambiance.addAmbiance);
apiRoutes.delete('/ambiances/:id', passport.authenticate('jwt', {session: false}), ambiance.removeAmbiance);

/////////////////////////STYLE FILTER CONTROLLER/////////////////////////
apiRoutes.get('/styles', style.getAllStyle);
apiRoutes.post('/styles', passport.authenticate('jwt', {session: false}), style.addStyle);
apiRoutes.delete('/styles/:id', passport.authenticate('jwt', {session: false}), style.removeStyle);

/////////////////////////LENGTH FILTER CONTROLLER/////////////////////////
apiRoutes.get('/lengths', length.getAllLength);
apiRoutes.post('/lengths', passport.authenticate('jwt', {session: false}), length.addLength);
apiRoutes.delete('/lengths/:id', passport.authenticate('jwt', {session: false}), length.removeLength);

/////////////////////////INSTRUMENT FILTER CONTROLLER/////////////////////////
apiRoutes.get('/instruments', instrument.getAllInstrument);
apiRoutes.post('/instruments', passport.authenticate('jwt', {session: false}), instrument.addInstrument);
apiRoutes.delete('/instruments/:id', passport.authenticate('jwt', {session: false}), instrument.removeInstrument);

/////////////////////////UPLOAD CONTROLLER/////////////////////////
apiRoutes.post('/upload_photos', uploadPhoto.uploadPhoto);
apiRoutes.post('/upload_song', uploadSong.uploadSong);

/////////////////////////SEND MAIL/////////////////////////
apiRoutes.post('/mail', mail.sendMail);




// Start the server
app.listen(port);
console.log('http://localhost:' + port);
