'use strict'

/*
Conte totes les rutes, requerin al controlador (subjectCtrl o studentCtrl)
que es on estan implementades
 */
const express = require('express')
const api = express.Router()
const subjectCtrl = require('../controllers/subject')
const studentCtrl = require('../controllers/student')

api.get('/subs',subjectCtrl.getSubjects),
api.get('/sub/:subjectId',subjectCtrl.getSubject),
api.post('/sub',subjectCtrl.addSubject)
api.get('/afagirMostra',subjectCtrl.addSampleSubject)
api.post('/stu/:subjectId',studentCtrl.addStudent)
api.get('/stu/:studentId',studentCtrl.getStudent)


module.exports =  api
