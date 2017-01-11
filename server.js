const express     = require('express');
const app         = express();
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const path        = require('path');
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

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/app/index.html'));
});

// Start the server
app.listen(port);
console.log('http://localhost:' + port);
