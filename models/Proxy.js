const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const proxySchema = new Schema({
  
    title:{type:String},
    proxies: [{type: String}],
    _owner:{type:Schema.Types.ObjectId,ref:'User'}

});

const Proxy = mongoose.model('Proxy', proxySchema);

module.exports = Proxy;
