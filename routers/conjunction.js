const router = require('express').Router();
const ControllerConj = require('./../controllers/controllerConj')

router.get('/', ControllerConj.getConj)
router.get('/add', ControllerConj.getAdd)
router.post('/add', ControllerConj.postAdd)
router.get('/edit/:id', ControllerConj.getEdit)
router.post('/edit/:id', ControllerConj.postEdit)
router.get('/delete/:id', ControllerConj.delete)

module.exports = router