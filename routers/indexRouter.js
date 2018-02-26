'use strict'

const express = require('express')
const productoCtrl = require('../controllers/productController')
const userCtrl = require('../controllers/userController')
const auth = require('../middlewares/auth')
const api = express.Router()


api.get('/product',productoCtrl.getProducts)
api.get('/product/:productId', productoCtrl.getProduct)
api.post('/product', productoCtrl.saveProduct)
api.put('/product/:productId',  productoCtrl.updateProduct)
api.delete('/product/:productId', productoCtrl.deleteProduct)
api.post('/signup', userCtrl.singUp)
api.post('/signin', userCtrl.singIn)
api.get('/private', auth, (req, res) => {
    res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api