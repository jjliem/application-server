const express = require("express");
const path = require('path'); //a node native module
const {Restaurant, Menu, Item} = require('./models/index');

const app = express();
const port = 3000;

//Q: What does express.static help us do?
//A: Helps serve static files such as images, CSS, js files
//Q: What do you think path.join helps us do?
//A: path.join takes absolute path of current executing file and adds public to it so express can find our static files
app.use(express.static(path.join(__dirname, 'public')))

//will add routes
app.get("/menu", async (request, response) => {
    let randInt = Math.ceil(Math.random()*3);
    let randMenu = await Menu.findByPk(randInt)
    response.json(randMenu)
})

//will add routes
app.get("/restaurant", async (request, response) => {
    let randInt = Math.ceil(Math.random()*3);
    let randResto = await Restaurant.findByPk(randInt)
    response.json(randResto)
})

//return menu and items
app.get("/menuitems", async (request, response) => {
    let randInt = Math.ceil(Math.random()*3);
    let randResto = await Restaurant.findByPk(randInt)
    let allItems = await Item.findAll();
    response.json([randResto, allItems])
})

//Q: What will our server be doing?
//A: server will be listening on this port for client requests
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
