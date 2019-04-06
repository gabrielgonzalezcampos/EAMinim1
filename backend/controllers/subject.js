'use strict'

const Subject = require('../models/subject')

function getSubjects(req,res){
    //Funcio per obtindre el nom de totes les assignature
    console.log("Peticio de obtindre totes les asignatures")
    //Només mostrem la llista de noms de les assignatures
    Subject.find({},{name:1},(err, asigs)=>{
        if(err) {
            return res.status(500).send({message: `Error al obtener las asignaturas: ${err}`})
        }
        else if(!asigs.length) {
            console.log("No hay ninguna asignatura")
            return res.status(403).send({message: `No hay asignaturas`})
        }
        else {
            console.log("Enviando lista de asignaturas"+asigs)
            res.status(200).send(asigs);
        }
    })

}

function getSubject(req,res){
    //Funcio per obtindre una asignatura en base al seu ID
    console.log("Peticio de obtindre una asignatura")
    let subjectId = req.params.subjectId
    //Al demanar només una asignatura enviem tota la llista de alumnes
    Subject.findById(subjectId, (err, asig)=>{
        if(err)
            return res.status(500).send({message: `Error al obtener las asignaturas: ${err}`})
        else if(!asig)
            return res.status(403).send({message: `No existe ninguna asignatura con ese ID `+req.params.subjectId})
        else
            res.status(200).send(asig);
    })

}

function addSubject(req,res){
    //Funció per afagir una assignatura
    const subjectNew = new Subject({
        name: req.body.name,
        students: req.body.students,
    })

    console.log("Petició d'afagir la seguent asignatura:"+subjectNew)
    Subject.find({name: req.body.name}).lean().exec(function(err, subj) {
        if(err){
            return res.status(500).send({message: `Error al añadir la asignatura: ${err}`})}
        if (!subj.length){
            subjectNew.save((err) => {
                if(err) {
                    console.log("Error al afagir l'assignatura "+req.body.name+". Ja existeix una assignatura amb aquest nom")
                    return res.status(403).send({message: `Error al añadir la asignatura: ${err}`})
                }
                console.log("Assignatura: "+req.body.name+" agregada correctament")
                res.status(200).send(subjectNew)
            } )     }
        else {
            console.log("Error al afagir l'assignatura "+req.body.name+". Ja existeix una assignatura amb aquest nom")
            return res.status(403).send({message: `Error al añadir la asignatura: ${err}`})
        }
    })

}

function addSampleSubject(req,res){
    //Funcio per afagir una assignatura de mostra
    var subjectNew = new Subject({name: "IOT",students:{name: "Carla",address:"Rue del Percebe",
            phones:[{name: "Casa", address: "838020"},{name: "Mobil", address: "323020"}]}
    })
    console.log("Petició d'afagir asignatures mostra")
    Subject.find(subjectNew).lean().exec(function(err, subj) {
        if(err){
            return res.status(500).send({message: `Error al añadir la asignatura: ${err}`})}
        if (!subj.length){
            subjectNew.save((err) => {
                if(err) {
                    return res.status(403).send({message: `Error al añadir la asignatura: ${err}`})
                }
                console.log("Assignatura: "+req.body.name+" agregada correctament")
                return res.status(200).send({message: subjectNew})
            } )     }
        else {
            console.log("Error al afagir l'assignatura "+req.body.name+". Ja existeix una assignatura amb aquest nom")
            return res.status(403).send({message: `Error al añadir la asignatura: ${err}`})
        }
    })

}

module.exports={
    getSubjects,
    getSubject,
    addSubject,
    addSampleSubject
}
