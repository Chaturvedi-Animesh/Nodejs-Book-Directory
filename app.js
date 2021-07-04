const express=require('express')
const port = 9000
const mongoose=require('mongoose')
const book=require('./Schema/book')
const url='mongodb://localhost:27017/book_database'
mongoose.connect(url,{useNewUrlParser:true,useFindAndModify:false,useUnifiedTopology:true})
const con=mongoose.connection
con.on('open',function(){
    console.log('connection sucessful')
})

con.on('error', console.error.bind(console, 'connection error:'));
const books=con.collection('books')

const app=express()
app.use(express.urlencoded({extended:true}))
app.delete('/',(req,res)=>{
    console.log(req.query)
    book.findByIdAndDelete(req.query.id,function(err,doc){
        res.status(200).send(doc)
    })
})
   
app.post('/addbook',(req,res)=>{
    books.insertOne(req.body)
    res.status(201).json({
        'status': 'New documnet added'
    })
})

app.get('/listbook/all',(req,res)=>{
    book.find({},function(err,doc){
        res.send(doc)
    })


}) 

app.get('/listbook/one',(req,res)=>{
    var i=req.query.id
    book.findOne({'_id':i},function(err,doc){
        res.send(doc)
    })

})

app.patch('/update',(req,res)=>{
    book.findByIdAndUpdate(req.query.id,{'name':req.query.name},{new:true},function(err,doc){
        res.send(doc)
    })
})

app.delete('/delete',function(req,res){
    book.findByIdAndDelete(req.query.id,function(err,doc){
        res.status(200).send(doc)
    })
})

app.listen(port,()=>{
console.log("Listening on port number :",port)
})