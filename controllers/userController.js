'use strict'

const User = require('../models/userModel')
const service = require('../services/indexService')

function singUp(req,res){
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.save((err) =>{
        if(err) return res.status(500).send({ message: `Error al crear el usuario: ${err}`})

        return res.status(201).send({token: service.createToken(user)})
    })
}

function singIn(req,res){
    User.find({email: req.body.email}, (err,user) =>{
        if (err) return res.status(500).send({message: `Error al registrarse ${err}`})
        if (!user) return res.status(404).send({message: 'No exite el usuario'})

        req.user = user
        res.status(200).send({
            message: 'Te has logueado correctamente',
            token: service.createToken(user)
        })
    })
}

module.exports = {
    singUp,
    singIn
}