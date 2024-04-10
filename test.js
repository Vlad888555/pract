const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Post = require("./module-db/modul-post")

app.get('/', function(req, res){
     res.sendFile(__dirname + '/index.html')
    //res.json()
})
app.get('/user/', (req, res)=>{
    res.sendFile(__dirname +'/index-user.html')
})
app.get('/basa/', (req, res)=>{
     res.sendFile(__dirname + '/basa.json')
})
app.get('/basapost/', (req, res)=>{
    res.sendFile(__dirname + '/basa_post.json')
})

app.use(express.static(__dirname))


app.listen(3000, function(){
    console.log("run")
}) 