var express     = require('express');
var app         = express();
var morgan      = require('morgan');
var body_parser = require('body-parser');
var cors        = require('cors');
var http        = require('http');
var https       = require('https');
var fs          = require('fs');

var userRouter  = require('./routes/usersRoutes');

var port        = process.env.PORT || 8000;
process.env.TZ  = 'UTC';

app.use(morgan('dev'));
app.use(cors());
app.use(body_parser.urlencoded({extended : true}));
app.use(body_parser.json());

http.createServer(app).listen(port);

// var options     = {
//     key:    fs.readFileSync('ssl/server.key', 'utf8'),
//     cert:   fs.readFileSync('ssl/server.cert', 'utf8')
// };
// https.createServer(options, app).listen(port);

app.get('/', function(req, res){
    res.send('Welcome to back-end Nugroho Kurio test');
});

console.log('Server running on port on port : ' + port);

app.use('/users', userRouter);