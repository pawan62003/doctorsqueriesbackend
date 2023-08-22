const mongoose = require("mongoose")

const AdminSchema = mongoose.Schema({
    name:{require:true,type:String},
    email:{require:true,type:String},
    password:{require:true,type:String},
})

const AdminModel = mongoose.model('admin',AdminSchema);

module.exports={
    AdminModel
}


