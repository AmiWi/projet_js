/*.................................DEPENDANCES....................................*/ 
var Particle = require('particle-api-js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const express = require('express');

const app = express();

var Users = require('./client/models/user.js');

//ecouteur d'évenements
var server = require('http').createServer(app);
//création du serveur de socket
var io = require('socket.io')(server);

//..................................................................................
//.......................CONNEXION A LA BDD.........................................
//..................................................................................
var promise=mongoose.connect('mongodb://localhost:27017/users',{
    useMongoClient:true,
});

// quand la connection est réussie
promise.then(
    () => {
        console.log('db.connected');
        // je démarre mon serveur node sur le port 3000
        app.listen(3000, function() {
            console.log('listening on 3000 and database is connected');
        });
    },
    err => {
        console.log('MONGO ERROR');
        console.log(err);
    }

);

//..................................................................................

// ecouter les evenements
io.sockets.on('connection', function (socket) {
    console.log("un client est connecté");

    socket.emit('monsocket', { hello: "world" });
});


//..................................................................................
//...........................POUR LE JSON...........................................
//..................................................................................

// prends en charge les requetes du type ("Content-type", "application/x-www-form-urlencoded")
app.use(bodyParser.urlencoded({
    extended: true
}));
// prends en charge les requetes du type ("Content-type", "application/json")
app.use(bodyParser.json());

//..................................................................................
// ............................ROUTES...............................................
//..................................................................................

// je déclare mon dossier qui contient mes vues
app.set('views', './views');

// je déclare mes fichiers statiques
app.use('/client', express.static('./client/'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

//..................................................................................

//Récupération des utilisateurs
app.get('/home',function(req,res){
    Users.find({},null,function(err,collection){
        if(err){
            console.log(err);
            return res.send(500);
        }else{
            console.log(collection);
            res.send(collection);
        }
    });
});