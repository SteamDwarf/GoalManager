const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (request, response) => {
    response.send('Hello World!');
})

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));