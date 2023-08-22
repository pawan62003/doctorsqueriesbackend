const mongoose = require('mongoose');
const appointMentModel = mongoose.model({
    useId:{required:true,type:String},
    doctorId:{required:true,type:String},
    status:{required:true,type:String},
},{
    versionKey:false
})

const appointMentSchema = mongoose.Schema("appointment",appointMentModel)

module.exports = {
    appointMentSchema
}