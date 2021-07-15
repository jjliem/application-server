const express = require("express");
const path = require('path'); //a node native module
const {Restaurant, Menu, Item} = require('./models/index');

const app = express();
const port = 3000;

// Add this boilerplate middleware to successfully use req.body
app.use(express.json())

//Q: What does express.static help us do?
//A: Helps serve static files such as images, CSS, js files
//Q: What do you think path.join helps us do?
//A: path.join takes absolute path of current executing file and adds public to it so express can find our static files
//app.use(express.static(path.join(__dirname, 'public')))

//get all restaurants
app.get("/restaurants", async (req, res) => {
    let restaurants = await Restaurant.findAll()
    res.json({ restaurants })
})

//get all menus
app.get("/menus", async (req, res) => {
    let menus = await Menu.findAll()
    res.json({ menus })
})

//get all items
app.get("/items", async (req, res) => {
    let items = await Item.findAll()
    res.json({ items })
})

//get random restaurant
app.get("/randomrestaurant", async (req, res) => {
    let randInt = Math.ceil(Math.random()*3);
    let randResto = await Restaurant.findByPk(randInt)
    res.json({ randResto })
})

//get restaurant by id and associated menu and items
app.get('/restaurants/:id', async (req, res) => {
    //nested eager loading
    let restaurant = await Restaurant.findByPk(req.params.id, { 
        include: {
        model: Menu,
            include: {
                model: Item
            }
        } 
    });
    //let restaurant = await Restaurant.findByPk(req.params.id, { include: Menu });
	res.json({ restaurant })
})

//get menu by id and associated items
app.get('/menus/:id', async (req, res) => {
	let menu = await Menu.findByPk(req.params.id, { include: Item });
	res.json({ menu })
})

//get item by id
app.get('/items/:id', async (req, res) => {
	let item = await Item.findByPk(req.params.id);
	res.json({ item })
})

// Add new restaurant
app.post('/restaurants', async (req, res) => {
	let newRestaurant = await Restaurant.create(req.body);
	res.send('Created!')
})

// Delete a restaurant
app.delete('/restaurants/:id', async (req, res) => {
	await Restaurant.destroy({
		where : {id : req.params.id} // Destory a restaurant where this object matches
	})
	res.send("Deleted!!")
})

// Update a restaurant
app.put("/restaurants/:id", async (req, res) => {
	let updated = await Restaurant.update(req.body, {
		where : {id : req.params.id} // Update a musician where the id matches, based on req.body
	})
	res.send("Updated!!")
})

//Q: What will our server be doing?
//A: server will be listening on this port for client requests
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
