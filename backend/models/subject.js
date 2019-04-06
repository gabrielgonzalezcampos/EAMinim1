'use strict'

const mongoose = require('mongoose')
//Com cada asignatura conte un vector d'estudiants, hem d'importar el model.
const StudentSchema = require('./student').schema;

const subjectSchema = new mongoose.Schema({
        //Podem marcar els camps únics amb unique:true. En el nostre cas el nom de l'assignatura
        name: {type: String,unique: true},
        students:[StudentSchema]
});

module.exports = mongoose.model('Subject',subjectSchema);
