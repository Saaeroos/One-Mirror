const mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({

    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    StudentID:{
        type: String,
        required: true
    },
    DateOfBirth:{
        type: Date,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Video:{
        type: String,
        required: false
    },
    profilePic:{
        data: Buffer,
        contentType: String,
        required: false
    },
    ShortDescription:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: true
    },
    Status:{
        type: String,
        required: true
    },
    LinkedIn_link:{
        type: String,
        required: false
    },
    Github_link:{
        type: String,
        required: false
    },
    hackerRank_link:{
        type: String,
        required: false
    },
    CV_link:{
        type: String,
        required: false
    }


})

module.exports = mongoose.model('Student', StudentSchema);