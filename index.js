'use strict'
const port =process.env.PORT || 3002;
const app = require('./app')


app.listen(3002, () =>{
    console.log(`Api rest  corriendo en el puerto : ${port}`);
 })
