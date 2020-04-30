const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    Name: {type: String},
    Desc: {type: String},
    Price: {type: Number},
    ManuDate: {type: Date, default: Date.now},
    ExpirDate: {type: Date, default: Date.now}
    
})


module.exports = mongoose.model('Product', productSchema)