const router = require('express').Router();
const ControllerTrader = require('./../controllers/controllerTrader')

router.get('/', ControllerTrader.getTraders)
router.get('/add', (req,res,next) => {
    if(req.session.isLogin){
        next()
    } else {
        throw new Error(`you need to login first`)
    }
}, ControllerTrader.getAdd)
router.post('/add', ControllerTrader.postAdd)
router.get('/edit/:id', ControllerTrader.getEdit)
router.post('/edit/:id', ControllerTrader.postEdit)
router.get('/delete/:id', ControllerTrader.delete)

module.exports = router