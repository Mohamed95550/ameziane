const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    discordId: String,
    email:String,
    discordTag: String,
    stripeCustomer: String,
    credits: { type: Number, default: 0 },
    dcAccess: { type: Boolean, default: false},
    endDcAccess: String
   
});

const userClass = mongoose.model('users', userSchema);

module.exports = userClass