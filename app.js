'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const baseUPS = require('./controladores/controller');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());

app.use((req,res, next)=>{
   res.header('Access-Control-Allow-Origin','*');
   res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Acces-Control-Allow-Requeste-Method');
   res.header('Access-Control-Allow-Methods','GET, POST , OPTIONS, PUT, DELETE');
   res.header('Allow','GET, POST , OPTIONS, PUT, DELETE');
   next();
})
app.get('/AlumnosDiscapacidad', baseUPS.AlumnosDiscapacidad);
app.get('/NotasAlumnos', baseUPS.NotasAlumnos);
app.get('/Materias', baseUPS.Materias);
module.exports = app;
