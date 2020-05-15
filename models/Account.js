const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({

    title:{type:String},
    accounts: [{type: String}],
    _owner:{type:Schema.Types.ObjectId,ref:'User'}

});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;