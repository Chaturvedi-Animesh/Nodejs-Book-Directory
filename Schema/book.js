const mongoose=require('mongoose')
const bookSchema=mongoose.Schema({
    id:Number,
    name:String
})
module.exports=mongoose.model('book',bookSchema)