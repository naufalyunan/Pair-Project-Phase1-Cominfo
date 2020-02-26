const { CommodityTrader,Trader,Commodity } = require('./../models')
class ControllerConj{
    static getConj(req,res){
        res.send(`LIST CONJUNCTION INCLUDE INCLUDE`)
    }
    static getAdd(req,res){
        Trader.findAll()
            .then(traders => {
                console.log(traders)
                Commodity.findAll()
                    .then(commodities => {
                        res.render('addConj', { commodities, traders })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static getEdit(req,res){
        let id = Number(req.params.id);
        CommodityTrader.findAll({
            where: {
                id
            }
        })
            .then(result => {
                let commodityTrader = result[0].dataValues
                let date = commodityTrader.date
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
                commodityTrader.date = newDate
                Trader.findAll()
                    .then(traders => {
                        Commodity.findAll()
                            .then(commodities => {
                                // console.log(result)
                                res.render('editConj', { commodities, traders, commodityTrader })
                            })
                            .catch(err => {
                                res.send(err)
                            })
                    })
                    .catch(err => {
                        res.send(err)
                    })
            })
            .catch(err => {
                res.send(err)
            })
    }
    static postAdd(req,res){
        let { CommodityId,TraderId,price,date,location } = req.body
        CommodityTrader.create({
            CommodityId,
            TraderId,
            price,
            date,
            location
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
        let { CommodityId,TraderId,price,date,location } = req.body
        CommodityTrader.update({
            CommodityId,
            TraderId,
            price,
            date,
            location
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
        CommodityTrader.destroy({
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

module.exports = ControllerConj