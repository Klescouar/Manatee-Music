const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const path        = require('path');
const multer  =   require('multer');
const mongoose    = require('mongoose');
const config      = require(__dirname + '/config/database');
const songs       = require(__dirname + '/app/controllers/controllers.songs');
const uploadPhoto = require(__dirname + '/app/controllers/controllers.upload.photo');
const uploadSong  = require(__dirname + '/app/controllers/controllers.upload.music');
const apiRoutes   = express.Router();
const port        = process.env.PORT || 6868;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

/////////////////////////SONG CONTROLLER/////////////////////////
apiRoutes.get('/getAllSongs', songs.getAllSongs);
apiRoutes.post('/addsong', songs.addSong);
apiRoutes.delete('/removeSong/:id', songs.removeSong);

/////////////////////////UPLOAD CONTROLLER/////////////////////////
apiRoutes.post('/upload_photos', uploadPhoto.uploadPhoto);
apiRoutes.post('/upload_song', uploadSong.uploadSong);


// Start the server
app.listen(port);
console.log('http://localhost:' + port);
