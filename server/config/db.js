const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.DB_URI)
    .then(conn => console.log(`Successfully connected to data base ${conn.connection.host}`))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
}

module.exports = connectDB;