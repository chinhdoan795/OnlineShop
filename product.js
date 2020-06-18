const express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://asm:12345@cluster0-9snej.mongodb.net/test';


router.get('/',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("asm");
   
    let results = await dbo.collection("products").find({}).toArray();
    res.render('allProducts',{products:results});
})

router.get('/add',(req,res)=>{
    res.render('addproduct');
})

router.post('/doAdd',async (req,res)=>{
    let client= await MongoClient.connect(url);
    let dbo = client.db("asm");
    let idValue = req.body.txtId;
    let nameValue = req.body.txtName;
    let newProduct = {id : idValue, name:nameValue};
    await dbo.collection("products").insertOne(newProduct);
   
    let results = await dbo.collection("products").find({}).toArray();
    res.render('allProducts',{products:results});
})

module.exports = router;