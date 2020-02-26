const router = require('express').Router();
const ControllerComm = require('./../controllers/controllerComm')

router.get('/', ControllerComm.getComm)
router.get('/add', ControllerComm.getAdd)
router.post('/add', ControllerComm.postAdd)
router.get('/edit', ControllerComm.getEdit)

module.exports = router