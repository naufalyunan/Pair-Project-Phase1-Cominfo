const { CommodityTrader,Trader,Commodity } = require('./../models')
class ControllerConj{
    static getConj(req,res){
        res.send(`LIST CONJUNCTION INCLUDE INCLUDE`)
    }
    static getConjByName(req,res){
        let name = req.params.name
        CommodityTrader.findAll({
            include: [Trader, Commodity]
        })
            .then(commodityTraders => {
                let searched = []
                commodityTraders.forEach(el => {
                    if(el.dataValues.Commodity.dataValues.name === name){
                        searched.push(el)
                    }
                })
                res.render('table-commodity', { searched })
                
            })
            .catch(err => {
                res.send(err)
            })
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

    static getByMarket(req,res){
        let market = req.params.market
        console.log(market)
        Commodity.findAll()
        .then(commodities => {
            // console.log(commodities)
            CommodityTrader.aggregate('location','DISTINCT',{ plain: false })
                .then(result => {
                    // console.log(result)
                    CommodityTrader.findAll({
                        include: [Trader, Commodity]
                    })
                        .then(commodityTraders => {
                            commodityTraders.forEach(el => {
                                let date = el.dataValues.date
                                let month = date.getMonth()
                                let day = date.getDate()
                                let year = date.getFullYear()
                                el.dataValues.month = month + 1
                                el.dataValues.day = day
                                el.dataValues.year = year
                            })
                            console.log(commodityTraders);
                            
                            // untuk bulan Jan 2019
                            let filtCommTraders = [];
                            commodityTraders.forEach(el => {
                                if(el.dataValues.month === 1 && el.dataValues.year === 2019 && el.dataValues.location === market) {
                                    filtCommTraders.push(el)
                                }
                            })
                            console.log(commodityTraders)
                            let newArr = []
                            let numberOfComm = {
                                name : []
                            }
                            filtCommTraders.forEach(el => {
                                numberOfComm.name.push(el.dataValues.Commodity.dataValues.name)
                            })
                            function onlyUnique(value, index, self) { 
                                return self.indexOf(value) === index;
                            }
                            let unique = numberOfComm.name.filter( onlyUnique );
                            for (let j = 0; j < unique.length; j++) {
                                let newObj = {}
                                let priceArr = []
                                for(let i = 0; i < filtCommTraders.length; i++){
                                    let name = filtCommTraders[i].dataValues.Commodity.dataValues.name
                                    let image = filtCommTraders[i].dataValues.Commodity.dataValues.image
                                    let id = filtCommTraders[i].dataValues.Commodity.dataValues.id
                                    let price = filtCommTraders[i].dataValues.price
                                    if(unique[j] === name){
                                        newObj.id = id;
                                        newObj.name = name;
                                        newObj.image = image;
                                        priceArr.push(price)
                                    } 
                                        
                                    if(i === filtCommTraders.length - 1) {
                                        newObj.price = priceArr;
                                    }    
                                    // console.log(priceArr);
                                    
                                }
                                newObj.avg = CommodityTrader.getAverage(newObj.price)
                                newArr.push(newObj)
                            }
                                
                            console.log(newArr);
                            res.render('home', { commodities, result, commodityTraders: newArr, req })

                        })
                        .catch(err => {
                            console.log(err)
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