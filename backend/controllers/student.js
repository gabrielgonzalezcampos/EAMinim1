'use strict'

const Student = require('../models/student')
const Subject = require('../models/subject')

function getStudent(req,res){
    //Funcio per obtindre un estudiant donat el seu ID
    let studentId = req.params.studentId
    console.log("Peticio de obtindre informació de un Alumne "+req.params.studentId)
    Subject.find({"students._id": studentId}, {_id: 0, students: {$elemMatch: {_id: studentId}}}, (err, stu)=>{
        if(err)
            return res.status(500).send({message: `Error al obtener el alumno: ${err}`})
        else if(!stu)
            return res.status(403).send({message: `No existe ningun alumno con ese ID`})
        else
            res.status(200).send(stu);
    })
    /*Subject.find({students: { $elemMatch: {_id: studentId}}}, {"students._id" :1},(err, stu)=>{
        if(err)
            return res.status(500).send({message: `Error al obtener el alumno: ${err}`})
        else if(!stu)
            return res.status(403).send({message: `No existe ningun alumno con ese ID`})
        else
            res.status(200).send(stu);
    })*/

}

function addStudent(req,res){
    //Funcio per afagir un estudiant donat el ID de la assignatura
    let subjectId = req.params.subjectId
    const StudentNew = new Student({
        name: req.body.name,
        address: req.body.address,
        phones: req.body.phones,
    })
    Subject.update({_id: subjectId},{$push: { students: StudentNew}},(err, stu)=>{
        console.log("Petició d'afagir el seguent alumne:"+StudentNew)
        if(err)
            return res.status(500).send({message: `Error al añadir el alumno: ${err}`})
        else if(!stu)
            return res.status(403).send({message: `No existe ninguna asignatura con ese ID`})
        else
            res.status(200).send(stu);
    })



}

module.exports={
    getStudent,
    addStudent

}
