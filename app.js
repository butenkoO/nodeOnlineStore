const express = require('express');
const app = express();
const MongoClient = require("mongodb").MongoClient;
const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true,
useUnifiedTopology: true });

app.use(express.json());
mongoClient.connect(function(err, client){
    if(err) return console.log(err);
    db = client.db("store_online");
    app.listen(3000, function(){
        console.log("all right. Server on 3000 port!" + Date());
    });
});
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'pug');
app.get('/', function (req, res) {
    db.collection("goods").find({}).toArray(function(err, users){
        if(err) return console.log(err);
        let tovar={};
        for(let i = 0; i<users.length;i++){
            tovar[users[i]['_id']]=users[i];
        }
        res.render('main', {good:tovar});
    });
});

app.get('/category/:id', function (req, res) {
    db.collection('goods').find({class:req.params.id}).toArray(function(err, goods){
        if(err) return console.log(err);
        res.render('main',{good:goods});
    });
    });

app.get('/:id', function (req, res) {
    db.collection('goods').find({_id:req.query.id}).toArray(function(err, goods){
        if(err) return console.log(err);
        res.render('good', {goods:goods});
    });
    });

app.post('/get-category-list', function(req, res){
    db.collection('category').find({}).toArray(function(err, category){
        if(err) return console.log(err);
        res.json(category);
    });
});

app.post('/get-goods-info', function(req, res){
    db.collection('goods').find({_id:{$in:req.body.key}}).toArray(function(err, result){
        if(err) return console.log(err);
        console.log(result);
        res.json(result);
    });
});
