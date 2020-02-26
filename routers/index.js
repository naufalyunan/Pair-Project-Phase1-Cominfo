router = require('express').Router();
const Controller = require('./../controllers/controller')
const routerComm = require('./commodities')
const routerTraders = require('./traders')

router.get('/', Controller.getHome)
router.use('/commodities', routerComm)
router.use('/traders', routerTraders)

module.exports = router;