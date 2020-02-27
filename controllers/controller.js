const { Trader, Commodity, CommodityTrader } = require('./../models')
class Controller{
    static getHome(req,res){
        // res.send('WELCOME TO HOME')
        Commodity.findAll()
            .then(commodities => {
                CommodityTrader.aggregate('location','DISTINCT',{ plain: false })
                    .then(result => {
                        CommodityTrader.findAll({
                            attributes: [
                                [ sequelize.fn('date_trunc', 'hour', sequelize.col('date')), 'hour'],
                            ],
                            group: 'hour',
                            include: [Trader, Commodity]
                        })
                            .then(commodityTraders => {
                                console.log(commodityTraders);
                                
                                res.render('home', { commodities, result, commodityTraders })

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
        res.render('loginPage')
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
                } else {
                    throw new Error(`Password is incorrect!`)
                }
                console.log(`anda login sebagai ${trader.username}`)
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }
    static logout(req,res){
        req.session.destroy(function(err){
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        });
    }
}

module.exports = Controller