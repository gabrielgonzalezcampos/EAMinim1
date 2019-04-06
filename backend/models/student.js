'use strict'

const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    //Podem marcar els camps únics amb unique:true. En el nostre cas el nom del estudiant
    name: {type: String,unique: true},
    address: String,
    phones:[{name: String, address: {type: String}}]
});

module.exports = mongoose.model('Student',studentSchema);
