const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/', function(req, res){
    res.send('hello from server');
})

/* app.route('/enroll').post(function(req, res){
    console.log(req.body);
}) */

app.listen(PORT, function(){
    console.log('server running on localhost:' + PORT);
})

var userRoutes = require('./api/routes/userRoutes.js')
app.use('/',userRoutes)

