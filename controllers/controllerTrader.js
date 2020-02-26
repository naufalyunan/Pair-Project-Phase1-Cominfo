const { Trader } = require('./../models')
class ControllerTrader{
    static getTraders(req,res){
        res.send(`LIST TRADER`)
    }
    static getAdd(req,res){
        res.render('addTrader')
    }
    static getEdit(req,res){
        let id = Number(req.params.id)
        Trader.findAll({
            where: {
                id
            }
        })
            .then(result => {
                let trader = result[0].dataValues
                let date = trader.birthdate
                let dd = date.getDate();
                let mm = date.getMonth() + 1; //January is 0!
                let yyyy = date.getFullYear();
                if (dd < 10) {
                dd = '0' + dd;
                } 
                if (mm < 10) {
                mm = '0' + mm;
                } 
                let newDate = yyyy + '-' + mm + '-' + dd;
                trader.birthdate = newDate
                res.render('editTrader',{ trader })

            })
            .catch(err => {
                res.send(err)
            })
    }
    static postAdd(req,res){
        let { name, birthdate, username, password } = req.body
        Trader.create({
            name,
            birthdate,
            username,
            password
        })
            .then(trader => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static postEdit(req,res){
        let id = Number(req.params.id)
        let { name, birthdate, username, password } = req.body
        Trader.update({
            name, 
            birthdate,
            username,
            password
        },{
            where: {
                id
            }
        })
            .then(trader => {
                res.redirect('/')
            })
            .catch(err => {
                res.send(err)
            })
    }
    static delete(req,res){
        let id = Number(req.params.id)
        Trader.destroy({
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

module.exports = ControllerTrader