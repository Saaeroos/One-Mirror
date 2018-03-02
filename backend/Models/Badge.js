const mongoose = require('mongoose');

var BadgeSchema = mongoose.Schema({

    StudentID:{
        type: String,
        required: true
    },
    BadgeName:{
        type: String,
        required: true
    },
    Status:{
        type: String,
        Default: null
    }
    
})

module.exports = mongoose.model('badge', BadgeSchema);