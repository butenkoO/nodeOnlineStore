const express = require('express');
const app = express();

const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });
let dbClient;

mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("store_online").collection("goods");
    app.listen(3000, function(){
        console.log("all right. Server on 3000 port!" + Date());
    });
});

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', function (req, res) {
    const collection = req.app.locals.collection;
    collection.find({}).toArray(function(err, users){
        if(err) return console.log(err);
        let tovar={};
        for(let i = 0; i<users.length;i++){
            tovar[users[i]['_id']]=users[i];
        }
        res.render('main', {good:tovar});
    });
});

app.get('/:id', function (req, res) {
    const collection = req.app.locals.collection;
    collection.find({_id:req.query.id}).toArray(function(err, users){
        if(err) return console.log(err);
        console.log(users);
        res.render('good', {goods:users});
    });
    });
