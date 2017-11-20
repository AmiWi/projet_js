/*.................................DEPENDANCES....................................*/ 
var Particle = require('particle-api-js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const express = require('express');

const app = express();

//********************************
// tes models sont biens faits, pk les mettre dans le client ???? tu ne les utilise que côté serveur...
//********************************
var Users = require('./client/models/user.js');
var Devices = require('./client/models/devices.js');

var particle = new Particle();

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


        //********************************
        // si tu veux que ton client puisse se connecter au serveur de socket, c'est server.liste et non pas app.listen...
        //********************************
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

        //********************************
        //le dossier ./views n'existe pas, il y en a un dans ./client/views à la limite mais ce n'est pas ça que tu voulais faire
        //********************************
app.set('views', './views');

// je déclare mes fichiers statiques
app.use('/client', express.static('./client/'));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

//..............................UTILISATEURS...................................

//Récupération des utilisateurs................
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

//Ajout d'un utilisateur.......................
app.post('/home', function(req, res) {
    // console.log(req);
    //console.log(req.body);
    //console.log("Nom " + req.body.nom);

    var userToSave = new Users(req.body);

    userToSave.save(function(err, success){
            if(err){
                return console.log(err);
            }
            else{
                console.log(success);
                res.send(success);

            }
        });
    
});

//Détails de l'utilisateur...................
app.get('/home/:id', function(req, res) {
    //console.log(req.params);
    //console.log(req.params.id);
    Users.findOne({
        "_id": req.params.id
    }, function(err, detailsUser) {
        if (err) {
            console.log(err);
            return res.send(err);
        } else {
            res.send(detailsUser);
        }
    });


});

//................................DEVICES..........................................
//Récupération des devices en BDD
app.get('/device',function(req,res){
    Devices.find({},null,function(err,collection){
        if(err){
            console.log(err);
            return res.send(500);
        }else{
            // console.log(collection);
            res.send(JSON.stringify(collection));
        }
    });
});

particle.login({username: 'leo@greenberry.io', password: 'stc110686'}).then(
  function(data) {
    token = data.body.access_token;
    console.log('Ca marche!');

    var devicesPr = particle.listDevices({ auth: token });
    
    devicesPr.then(
      function(devices) {
          console.log('Devices: ', devices);
          // devices = JSON.parse(devices);
          console.log(devices.body);
          devices.body.forEach(function(device){
            var toSave = new Devices(device);
            

            toSave.save(function(err, success){
              if(err){
                console.log(err);
              }
              else{
                console.log('device saved');
              }
            })
          });
      },
      function(err) {
        console.log('List devices call failed: ', err);
      }
    );
  }
);