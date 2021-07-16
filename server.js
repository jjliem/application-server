const express = require("express");
const path = require('path'); //a node native module
const {Restaurant, Menu, Item} = require('./models/index');
const { check, validationResult } = require('express-validator');
const { Whitelist } = require('./Whitelist')

const app = express();
const port = 3000;

// Add this boilerplate middleware to successfully use req.body
app.use(express.json())

//Q: What does express.static help us do?
//A: Helps serve static files such as images, CSS, js files
//Q: What do you think path.join helps us do?
//A: path.join takes absolute path of current executing file and adds public to it so express can find our static files
//app.use(express.static(path.join(__dirname, 'public')))

//Get all restaurants
app.get("/restaurants", async (req, res) => {
    let restaurants = await Restaurant.findAll()
    res.json({ restaurants })
})

//Get random restaurant
app.get("/randomrestaurant", async (req, res) => {
    let randInt = Math.ceil(Math.random()*3);
    let randResto = await Restaurant.findByPk(randInt)
    res.json({ randResto })
})

//Get restaurant by id and associated menu and items
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

// Add new restaurant with validation
app.post('/restaurants', [
    check('name').isLength({max:50}).not().isEmpty().trim().escape(),
    check('location').isLength({max:50}).not().isEmpty().trim().escape(),
    check('cuisine').isLength({max:50}).not().isEmpty().trim().escape(),
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let newRestaurant = await Restaurant.create(req.body);
	    res.send('Created!');
    }
})

// Delete a restaurant
app.delete('/restaurants/:id', [
    check("id").isNumeric().not().isEmpty().trim().escape()
    ], async (req, res) => {
        const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        await Restaurant.destroy({
            where : {id : req.params.id} // Destory a restaurant where this object matches
        })
        res.send("Deleted!!")
    }
})

// Update a restaurant with validation
app.put("/restaurants/:id", [
    check('name').isLength({max:50}).not().isEmpty().trim().escape(),
    check('location').isLength({max:50}).not().isEmpty().trim().escape(),
    check('cuisine').isLength({max:50}).not().isEmpty().trim().escape(),
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let updated = await Restaurant.update(req.body, {
            where : {id : req.params.id} // Update a musician where the id matches, based on req.body
        })
        res.send("Updated!!")
    }
})

// Patch a restaurant by id
app.patch("/restaurants/:id", [
    check('name').isLength({max:50}).not().isEmpty().trim().escape(),
    check('location').isLength({max:50}).not().isEmpty().trim().escape(),
    check('cuisine').isLength({max:50}).not().isEmpty().trim().escape(),
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let updated = await Restaurant.update(req.body, {
            where : {id : req.params.id} // Update a musician where the id matches, based on req.body
        })
        res.send("Updated!!")
    }
})

//----------------------------------------------------------------------------------

//Get all menus
app.get("/menus", async (req, res) => {
    let menus = await Menu.findAll()
    res.json({ menus })
})

//Get menu by id and associated items
app.get('/menus/:id', async (req, res) => {
	let menu = await Menu.findByPk(req.params.id, { include: Item });
	res.json({ menu })
})

// let whitelist = []
// restaurants.ForEach(whitelist.push(id)) where does this code go?

//let whitelist = ["1", "2", "3"];
//whitelist.js
// Add new menu with validation
app.post('/menus', [
    check('title').isLength({max:50}).not().isEmpty().trim().escape(),
    check('RestaurantId').isNumeric().isWhitelisted(Whitelist.forMenu).not().isEmpty().trim().escape()
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let newMenu = await Menu.create(req.body);
	    res.send('Created!');
    }
})

// Delete a menu
app.delete('/menus/:id', [
    check("id").isNumeric().not().isEmpty().trim().escape()
    ], async (req, res) => {
        const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        await Menu.destroy({
            where : {id : req.params.id} // Destory a menu where this object matches
        })
        res.send("Deleted!!")
    }
})

// Update a menu with validation
app.put("/menu/:id", [
    check('title').isLength({max:50}).not().isEmpty().trim().escape(),
    check('RestaurantId').isNumeric().isWhitelisted(Whitelist.forMenu).not().isEmpty().trim().escape()
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let updated = await Menu.update(req.body, {
            where : {id : req.params.id} // Update a musician where the id matches, based on req.body
        })
        res.send("Updated!!")
    }
})

// Patch a menu with validation
app.patch("/menu/:id", [
    check('title').isLength({max:50}).not().isEmpty().trim().escape(),
    check('RestaurantId').isNumeric().isWhitelisted(Whitelist.forMenu).not().isEmpty().trim().escape()
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let updated = await Menu.update(req.body, {
            where : {id : req.params.id} // Update a musician where the id matches, based on req.body
        })
        res.send("Updated!!")
    }
})

//----------------------------------------------------------------------------------

//Get all items
app.get("/items", async (req, res) => {
    let items = await Item.findAll()
    res.json({ items })
})

//Get item by id
app.get('/items/:id', async (req, res) => {
	let item = await Item.findByPk(req.params.id);
	res.json({ item })
})

// Add a new item with validation
app.post('/items', [
    check('name').isLength({max:50}).not().isEmpty().trim().escape(),
    check('image').isLength({max:50}).not().isEmpty().trim().escape(),
    check('price').isFloat().not().isEmpty().trim().escape(),
    check('vegetarian').isBoolean().not().isEmpty().trim().escape(),
    check('MenuId').isNumeric().isWhitelisted(Whitelist.forItem).not().isEmpty().trim().escape()
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let newItem = await Item.create(req.body);
	    res.send('Created!');
    }
})

// Delete an item 
app.delete('/items/:id', [
    check("id").isNumeric().not().isEmpty().trim().escape()
    ], async (req, res) => {
        const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        await Item.destroy({
            where : {id : req.params.id} // Destory a menu where this object matches
        })
        res.send("Deleted!!")
    }
})

// Update an item with validation
app.put("/items/:id", [
    check('name').isLength({max:50}).not().isEmpty().trim().escape(),
    check('image').isLength({max:50}).not().isEmpty().trim().escape(),
    check('price').isFloat().not().isEmpty().trim().escape(),
    check('vegetarian').isBoolean().not().isEmpty().trim().escape(),
    check('MenuId').isNumeric().isWhitelisted(Whitelist.forItem).not().isEmpty().trim().escape()
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let updated = await Item.update(req.body, {
            where : {id : req.params.id} // Update a musician where the id matches, based on req.body
        })
        res.send("Updated!!")
    }
})

// Patch an item with validation
app.patch("/items/:id", [
    check('name').isLength({max:50}).not().isEmpty().trim().escape(),
    check('image').isLength({max:50}).not().isEmpty().trim().escape(),
    check('price').isFloat().not().isEmpty().trim().escape(),
    check('vegetarian').isBoolean().not().isEmpty().trim().escape(),
    check('MenuId').isNumeric().isWhitelisted(Whitelist.forItem).not().isEmpty().trim().escape()
    ], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    } else {
        let updated = await Item.update(req.body, {
            where : {id : req.params.id} // Update a musician where the id matches, based on req.body
        })
        res.send("Updated!!")
    }
})

//Q: What will our server be doing?
//A: server will be listening on this port for client requests
app.listen(port, () => {
    
    console.log(`Server listening at http://localhost:${port}`);
});
