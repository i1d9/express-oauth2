const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    type: {
        required: true,
        type: String
    },
    code: {
        required: true,
        type: String,
        unique: true
    },
    code_challenge_method: {
        required: true,
        type: String
    },
    code_challenge: {
        required: true,
        type: String
    },
    expiry: {
        required: true,
        type: Date
    },
    scopes: {
        type: Array
    }
})

module.exports = mongoose.model('Codes', dataSchema)