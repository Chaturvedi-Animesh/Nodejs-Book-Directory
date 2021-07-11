const bodyParser = require('body-parser')
const express=require('express')
const port = 9000
const mongoose=require('mongoose')
const book=require('./Schema/book')
const multer=require('multer')
const fs=require('fs')
const path=require('path')
const url='mongodb://localhost:27017/book_database'
mongoose.connect(url,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true})
const con=mongoose.connection
con.on('open',function(){
    console.log('connection sucessful')
})

con.on('error', console.error.bind(console, 'connection error:'));
const books=con.collection('books')

const app=express()



const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/uploads/')
    },
    filename : function(req,file,cb){
        var date=new Date()
        var n=''+date.getDate()+date.getMonth()+date.getFullYear()
        cb(null,n + file.originalname)
    }
})

const upload=multer({storage: storage})

app.set('view engine','ejs')
app.use(express.static(__dirname+'/public'))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get('/',(req,res)=>{
    book.find({},function(err,doc){
        console.log(doc)
        res.render('index',{books:doc})
    })
})
   
app.post('/addbook',upload.single('photo'),(req,res)=>{
    
    console.log(req.body.name)
    var b=new book({
        name: req.body.name,
        author: req.body.author,
        image:req.file.filename
    })

    b.save().then(result=>{
        console.log(result)
        res.redirect('/')
    })
})

app.get('/listbook/all',(req,res)=>{
    book.find({},function(err,doc){
        res.render('index',{books:doc})
    })


}) 

app.get('/listbook/one',(req,res)=>{
    var i=req.query.id
    book.findOne({'_id':i},function(err,doc){
        res.send(doc)
    })

})

app.put('/update',(req,res)=>{
    book.findByIdAndUpdate(req.body.id,{'name':req.body.name},{new:true},function(err,doc){
        res.send(doc)
    })
})

app.put('/delete',function(req,res){
    fs.unlink('./public/uploads/'+req.body.address,function(err){
        console.log(err)
    })
    book.findByIdAndDelete(req.body.id,function(err,doc){
        res.send("done")
    })
})

app.listen(port,()=>{
console.log("Listening on port number :",port)
})