const express = require('express');
const port = process.env.PORT || 3002;
const host = process.env.HOST || '127.0.0.1';

const app = express();
app.use(express.json());


// routes
const calcRoutes = require('./calc/routes')
app.use('/calc', calcRoutes);

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})