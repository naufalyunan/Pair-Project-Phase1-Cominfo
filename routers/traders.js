const router = require('express').Router();
const ControllerTrader = require('./../controllers/controllerTrader')

router.get('/', ControllerTrader.getTraders)
router.get('/add', ControllerTrader.getAdd)
router.post('/add', ControllerTrader.postAdd)
router.get('/edit', ControllerTrader.getEdit)

module.exports = router