const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');
const goalsRoute = require('./routes/goals');

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (request, response) => {
    response.send('Hello World!');
})
app.use('/api/goals', goalsRoute);

app.use(errorHandler);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
})
