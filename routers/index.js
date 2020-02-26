router = require('express').Router();
const Controller = require('./../controllers/controller')
const routerComm = require('./commodities')
const routerTraders = require('./traders')
const routerConj = require('./conjunction')

router.get('/', Controller.getHome)
router.use('/commodities', routerComm)
router.use('/traders', routerTraders)
router.use('/conjunction', routerConj)
//login
router.get('/login', Controller.getLogin)
router.post('/login', Controller.postLogin)
router.get('/logout', Controller.logout)
module.exports = router;