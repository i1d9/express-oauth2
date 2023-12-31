const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    secret: {
        required: true,
        type: String,
        unique: true
    },
    name: {
        required: true,
        type: String
    },
    scopes: {
        required: true,
        type: Array
    },
    redirect_uri: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String,
        enum: ["confidential", "public"]
    }
})

module.exports = mongoose.model('Clients', dataSchema)