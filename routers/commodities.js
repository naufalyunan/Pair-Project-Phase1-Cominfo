const router = require('express').Router();
const ControllerComm = require('./../controllers/controllerComm')

router.get('/', ControllerComm.getComm)
router.get('/add', ControllerComm.getAdd)
router.post('/add', ControllerComm.postAdd)
router.get('/edit/:id', ControllerComm.getEdit)
router.post('/edit/:id', ControllerComm.postEdit)
router.get('/delete/:id', ControllerComm.delete)

module.exports = router