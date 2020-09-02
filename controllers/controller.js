const { Trader, Commodity, CommodityTrader } = require('./../models')
class Controller{
    static getHome(req,res){
        // res.send('WELCOME TO HOME')
        Commodity.findAll()
            .then(commodities => {
                CommodityTrader.aggregate('location','DISTINCT',{ plain: false })
                    .then(result => {
                        CommodityTrader.findAll({
                            include: [Trader, Commodity]
                        })
                            .then(commodityTraders => {
                                // console.log(commodityTraders);
                                commodityTraders.forEach(el => {
                                    let date = el.dataValues.date
                                    let month = date.getMonth()
                                    let day = date.getDate()
                                    let year = date.getFullYear()
                                    el.dataValues.month = month + 1
                                    el.dataValues.day = day
                                    el.dataValues.year = year
                                })
                                
                                // untuk bulan Jan 2019
                                let filtCommTraders = [];
                                commodityTraders.forEach(el => {
                                    if(el.dataValues.month === 1 && el.dataValues.year === 2019) {
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
                                console.log(unique);
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
                                        console.log(priceArr);
                                        
                                    }
                                    newObj.avg = CommodityTrader.getAverage(newObj.price)
                                    newArr.push(newObj)
                                }
                                    
                                console.log(newArr);
                                console.log(req.session);

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

    static getHomeVar(req,res){
        let bulan = Number(req.params.bulan)
        let tahun = Number(req.params.tahun)
        Commodity.findAll()
            .then(commodities => {
                CommodityTrader.aggregate('location','DISTINCT',{ plain: false })
                    .then(result => {
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
                                
                                // untuk bulan Jan 2019
                                let filtCommTraders = [];
                                commodityTraders.forEach(el => {
                                    if(el.dataValues.month === bulan && el.dataValues.year === tahun) {
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
                                        console.log(priceArr);
                                        
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
    static getLogin(req,res){
        res.render('login-form', { errors: null })
    }
    static postLogin(req,res){
        let { username,password } = req.body
        Trader.findAll({
            where: {
                username
            }
        })
            .then(result => {
                // console.log(result)
                let trader = result[0].dataValues
                if(trader.password === password){
                    req.session.isLogin = true
                    req.session.username = username
                } else {
                    throw new Error(`Password is incorrect!`)
                }
                console.log(`anda login sebagai ${trader.username}`)
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
                res.render('login-form', { errors:err })
            })
    }
    static logout(req,res){
        req.session.destroy(function(err){
            if (err) {
                res.send(err)
            } else {
                console.log(`logout`);
                res.redirect('/')
            }
        });
    }
}

module.exports = Controller