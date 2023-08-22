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
    }
})

module.exports = mongoose.model('Clients', dataSchema)