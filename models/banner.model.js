const mongoose = require('mongoose')

const BannerSchema = mongoose.Schema({
    Image:{type:String},
    name:{type:String}
})

const BannerModel = mongoose.model("banner",BannerSchema)

module.exports={
    BannerModel
}