const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({

    website:{type:String},
    status: { type: String, default:'STOPPED'} ,
    account: {type:String},
    proxy: {type:String},
    infos :[Schema.Types.Mixed],
    createdDate: {type:Date},
    _owner:{type:Schema.Types.ObjectId,ref:'User'}

});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;