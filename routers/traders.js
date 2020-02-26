const router = require('express').Router();
const ControllerTrader = require('./../controllers/controllerTrader')

router.get('/', ControllerTrader.getTraders)
router.get('/add', ControllerTrader.getAdd)
router.post('/add', ControllerTrader.postAdd)
router.get('/edit/:id', ControllerTrader.getEdit)
router.post('/edit/:id', ControllerTrader.postEdit)
router.get('/delete/:id', ControllerTrader.delete)

module.exports = router