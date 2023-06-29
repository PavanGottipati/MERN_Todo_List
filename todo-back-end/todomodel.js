const mongoose=require('mongoose')

const Todomodel=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    task:{
        type:String,
        required:true,
    }
})

module.exports=mongoose.model('todotaskmanager',Todomodel);