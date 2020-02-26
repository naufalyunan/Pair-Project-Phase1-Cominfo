class Controller{
    static getHome(req,res){
        // res.send('WELCOME TO HOME')
        res.render('home')
    }
}

module.exports = Controller