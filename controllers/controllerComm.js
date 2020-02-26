const { Commodity } = require('./../models')
class ControllerComm{
    static getComm(req,res){
        // res.send(`LIST COMMODITIES`)
        res.render('home')
    }
    static getAdd(req,res){
        res.send(`form add comm`)
    }
    static getEdit(req,res){
        res.send('form edit comm')
    }
    static postAdd(req,res){
        let { name } = req.body
        Commodity.create({
            name
        })
            .then(commodity => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerComm