const express = require("express");
const exprhnlbs = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 3000;

//firstArg: tells Express that the template engine will be responsible for all files with the handlebars extension
//secondArg: directs the templating engine to defaultLayout; handlebars will look inside of our layouts directory
app.engine("handlebars", exprhnlbs({defaultLayout: "main"}));

//firstArg: lets express know the view engine is set
//secondArg: sets the view engine as a handlebars
app.set("view engine", "handlebars");

const cakes = [
    {
        route: "honey-cake",
        name: "Honey Cake",
        layers: "special honey crust",
        filling: "whipped condensed milk",
        size: 8,
        price: 50
    },
    {
        route: "black-forest",
        name: "Black Forest",
        layers: "chocolate",
        filling: "whipped sour cherry cream",
        size: 6,
        price: 30
    },
    {
        route: "vanilla-berry",
        name: "Vanilla Berry",
        layers: "vanilla",
        filling: "berry mousse",
        size: 6,
        price: 30
    }
];

app.get("/cakes", (req, res) => {
    // console.log(res);
    res.render("cakes", {cakelist: cakes});
});

app.get("/cakes/:route", (req, res) => {
    cakes.forEach(cake => cake.route === req.params.route ? res.render("cake-name", cake) : console.log("There is no such cake"));
});

app.listen(PORT, () => {
    console.log(`Server is listening on: http://localhost: ${PORT}`);
});