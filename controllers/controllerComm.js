const { Commodity } = require('./../models')
class ControllerComm{
    static getComm(req,res){
        res.send(`LIST COMMODITIES`)
    }
    static getAdd(req,res){
        res.render('addCommodity')
    }
    static getEdit(req,res){
        let id = Number(req.params.id);
        Commodity.findAll({
            where: {
                id
            }
        })
            .then(result => {
                let commodity = result[0].dataValues
                console.log(result)
                res.render('editCommodity', { commodity })
            })
            .catch(err => {
                res.send(err)
            })
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
    static postEdit(req,res){
        let id = Number(req.params.id);
        let { name } = req.body
        Commodity.update({
            name
        }, {
            where: {
                id
            }
        })
            .then(result => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static delete(req,res){
        let id = Number(req.params.id)
        Commodity.destroy({
            where: {
                id
            }
        })
            .then(result => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = ControllerComm