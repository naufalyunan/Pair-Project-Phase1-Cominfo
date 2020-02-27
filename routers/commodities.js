const router = require('express').Router();
const ControllerComm = require('./../controllers/controllerComm')

router.get('/', ControllerComm.getComm)
router.get('/add', (req,res,next) => {
    if(req.session.isLogin){
        next()
    } else {
        throw new Error(`You need to login first`)
    }
}, ControllerComm.getAdd)
router.post('/add', ControllerComm.postAdd)
router.get('/edit/:id', ControllerComm.getEdit)
router.post('/edit/:id', ControllerComm.postEdit)
router.get('/delete/:id', ControllerComm.delete)
router.get('/:name', ControllerComm.getByName)
module.exports = router