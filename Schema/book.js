const mongoose=require('mongoose')
const bookSchema=mongoose.Schema({
    name:String,
    author:String,
    image:String
})
module.exports=mongoose.model('book',bookSchema)