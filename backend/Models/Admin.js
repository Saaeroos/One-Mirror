const mongoose = require('mongoose');

var AdminSchema = mongoose.Schema({

    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('admin', AdminSchema);