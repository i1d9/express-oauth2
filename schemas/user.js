const mongoose = require('mongoose');


var validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const dataSchema = new mongoose.Schema({
    first_name: {
        required: true,
        type: String,
        uppercase: true
    },
    last_name: {
        required: true,
        type: String,
        uppercase: true
    },
    email: {

        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('Users', dataSchema)