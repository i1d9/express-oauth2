require('dotenv').config();
const mongoose = require('mongoose');

const mongoString = process.env.ATLAS_URI;

let database;

module.exports = {

    connectToServer: () => {
        mongoose.connect(mongoString);
        database = mongoose.connection;


        database.on('error', (error) => {
            console.log(error)
        });

        database.once('connected', () => {
            console.log('Database Connected');
        });
      
    },
    database: database
};