const express = require('express');
const dotenv = require('dotenv').config();
const {connectDBClient, getItems} = require('./database/dbController');
const errorHandler = require('./middlewares/errorHandler');
const goalsRoute = require('./routes/goals.route');
const errorRouter = require('./routes/error.route');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/goals', goalsRoute);
app.use('/error', errorRouter)

app.use(errorHandler);

connectDBClient(() => {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
});

