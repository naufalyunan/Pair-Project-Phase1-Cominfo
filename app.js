const express = require('express');
const app = express();
const port = 3002;
const router = require('./routers/index');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));


app.use(router);


app.listen(port,() => {
    console.log(`i love you ${port}`)
});
