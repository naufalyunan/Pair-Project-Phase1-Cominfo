const router = require('express').Router();
const ControllerConj = require('./../controllers/controllerConj')

router.get('/', ControllerConj.getConj)
router.get('/add', (req,res, next) => {
    if (req.session.isLogin) {
        next()
    } else {
        throw new Error('You need to login first')
    }
} , ControllerConj.getAdd)
router.post('/add', ControllerConj.postAdd)
router.get('/edit/:id', ControllerConj.getEdit)
router.post('/edit/:id', ControllerConj.postEdit)
router.get('/delete/:id', ControllerConj.delete)
router.get('/:market', ControllerConj.getByMarket)

module.exports = router