const mongoose = require('mongoose');

var ScoreSchema = mongoose.Schema({

    StudentID:{
        type: String,
        required: true
    },
    ChallengeName:{
        type: String,
        required: true
    },
    Score:{
        type: Number,
        required: true
    }
    
})

module.exports = mongoose.model('score', ScoreSchema);