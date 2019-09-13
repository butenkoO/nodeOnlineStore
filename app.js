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
    db.collection("goods").find({top:'1'}).toArray(function(err, top){
        if(err) return console.log(err);
        res.render('index', {good:top});
    });
});

app.get('/all', function (req, res) {
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
let categ = new Promise(function(resolve, reject){
    db.collection('category').find({class:req.params.id}).toArray(function(err, res){
        if(err) reject(err);
        resolve(res);
    });
});
let categGoods = new Promise(function(resolve, reject){
    db.collection('goods').find({class:req.params.id}).toArray(function(err, result){
        if(err) return reject(err);
        resolve(result);
    });
});
Promise.all([categ, categGoods]).then(function(value){
    res.render('category', {categ: value[0], goods:value[1]});
});
    });

app.get('/order', function (req, res) {
    res.render('order');
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
    if(req.body.key.length != 0){
        db.collection('goods').find({_id:{$in:req.body.key}}).toArray(function(err, result){
            if(err) return console.log(err);
            let goods = {};
            for(let i=0; i<result.length; i++){
                goods[result[i]['_id']] = result[i];
            }
            res.json(goods);
        });
    }else{
        res.send('0');
    }
});
