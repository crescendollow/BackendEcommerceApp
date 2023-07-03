const {Router} = require('express')
const sessionController= require('../controller/session.controller')
const passport = require('passport')
const passportCustom = require('../utils/passportCall')
const { REGISTER_STRATEGY, LOGIN_STRATEGY, JWT_STRATEGY } = require('../config/config')
const { adminPermission } = require('../utils/middleware/isUser')
const router = Router()

router.post('/register', passport.authenticate(REGISTER_STRATEGY,{session:false}) , sessionController.loginRegister)
router.post('/login',passport.authenticate(LOGIN_STRATEGY,{session:false}), sessionController.sessionLogin)
router.get('/current',passportCustom(JWT_STRATEGY),adminPermission,sessionController.getCurrent)

module.exports = router;