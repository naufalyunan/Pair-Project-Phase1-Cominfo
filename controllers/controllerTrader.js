class ControllerTrader{
    static getTraders(req,res){
        res.send(`LIST TRADER`)
    }
    static getAdd(req,res){
        res.render('addTrader')
    }
    static getEdit(req,res){
        res.send('form edit')
    }
    static postAdd(req,res){

    }
}

module.exports = ControllerTrader