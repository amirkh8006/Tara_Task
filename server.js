const {
    port
} = require('./config/config');
const express = require('express');
const app = require('express')();
const cors = require('cors')


// MiddleWares
app.use(express.json());
app.use(cors())

//Connect To DB
require('./connection/db')


app.use('/admin' , require('./routes/admin'))


app.listen(port, () => {
    console.log(`Listening On Port ${port}`);
});