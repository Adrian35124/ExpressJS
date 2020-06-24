let express = require('express')
let path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
let app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post("/contact-form", (req, res, next) =>{
    let obj = {
        email: req.body.email,
        password: req.body.password
    }
    obj = JSON.stringify(obj);

    fs.appendFileSync('../log.json', obj, (err) => {
            if (err) throw err;
        console.log("it works!")
    });
    next();
})

app.use((req, res, next) => {
    fs.appendFileSync('log.txt',`${req.url}\n`);
    next();
});


app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.send("Hello from the web server side...")
})

app.listen(3000);