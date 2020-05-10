const express = require("express");
const exprhnlbs = require("express-handlebars");
const mysql = require("mysql");
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3010;

//middleware to transform the request so the data that was sent on req.body could be read
app.use(express.urlencoded({extended: true}));
//parses incoming requests with JSON payloads and is based on body-parser
//returns middleware that only parses JSON and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

//firstArg: tells Express that the template engine will be responsible for all files with the handlebars extension
//secondArg: directs the templating engine to defaultLayout; handlebars will look inside of our layouts directory
app.engine("handlebars", exprhnlbs({defaultLayout: "main"}));

//firstArg: lets express know the view engine is set
//secondArg: sets the view engine as a handlebars
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "cakes_db"
});

connection.connect((err) => {
    if (err) {
        console.error(`error connecting: ${err.stack}`);
        return;
    }
    console.log(`connection as id ${connection.threadId}`);
});

app.get("/cakes", (req, res) => {
    const sql = "select * from cakes;"
    connection.query(sql, (err, data) => {
        if (err) throw err;
        console.log(data);
        res.render("cakes", {cakelist: data});
    });
});

app.get("/cakes/:cakeName", (req, res) => {
    const sql = `select * from cakes where route="${req.params.cakeName}"`;
    connection.query(sql, (err, data) => {
        if (err) throw err;
        data.forEach(cake => {
            res.render("cake-name", cake);
        });
    });
});

const cart = {};

app.post('/order', function (req, res) {
    // console.log(req.body);
    const id = req.body.id;
    if (!cart[id]) {
        cart[id] = {};
        cart[id]["quantity"] = req.body.quantity;
        cart[id]["comment"] = req.body.comment;
    } else {
        cart[id]["quantity"] = req.body.quantity;
        cart[id]["comment"] = req.body.comment;
    }
    res.send(cart);
})

app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost: ${PORT}`);
});