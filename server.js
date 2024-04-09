const {
    port
} = require('./config/config');
const express = require('express');
const app = require('express')();
const cors = require('cors')
const auth = require('./middleWares/auth')


// MiddleWares
app.use(express.json());
app.use(cors())

//Connect To DB
require('./connection/db')

// Check MiddleWares
app.use('/admin', auth.adminAuthentication)
app.use('/user', auth.userAuthentication)


app.use('/admin/questionAnswer' , require('./routes/admin/questionAnswer'))
app.use('/admin/section' , require('./routes/admin/section'))
app.use('/admin/topic' , require('./routes/admin/topic'))
app.use('/user/questionAnswer' , require('./routes/user/questionAnswer'))


app.listen(port, () => {
    console.log(`Listening On Port ${port}`);
});