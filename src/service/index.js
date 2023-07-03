const daoProducts = require('../dao/mongoManager/BdProductManager')
const daoCarts = require('../dao/mongoManager/BdCartManager')
const daoSession = require('../dao/mongoManager/BdsessionManager')
const daoUser = require('./users.service')


const productService = require('../service/products.service.bd')
const cartsService = require('../service/carts.service.bd')
const sessionService = require('../service/session.service')
const userService = require('../service/users.service')
 
const productServices = new productService(daoProducts)
const cartsServices = new cartsService(daoCarts)
const sesionServices = new sessionService(daoSession)
const usersServices = new userService(daoUser)

module.exports ={
    productServices,
    cartsServices,
    sesionServices,
    usersServices
}