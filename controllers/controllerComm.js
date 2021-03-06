const { Commodity, CommodityTrader, Trader } = require('./../models')
class ControllerComm{
    static getComm(req,res){
        // res.send(`LIST COMMODITIES`)
        res.send('home')
    }
    static getByName(req,res){
        let name = req.params.name
        console.log(name);
        Commodity.findAll()
        .then(commodities => {
            console.log(commodities)
            CommodityTrader.aggregate('location','DISTINCT',{ plain: false })
                .then(result => {
                    console.log(result)
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
                                if(el.dataValues.month === 1 && el.dataValues.year === 2019 && el.dataValues.Commodity.dataValues.name === name) {
                                    filtCommTraders.push(el)
                                }
                            })
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