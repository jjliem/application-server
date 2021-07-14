const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index') //Q: WHY import these models from index vs. from each separate model file?
                                                           //A: the index file has all the associations

//Q: Why do you think each object inside of the arrays are structured the way that they are?
//A: looks like the format is so that this information can be easily stored into a database table with rows and columns
//Q: What do you think will happen when we 'seed' this file?
//A: We'll populate our database with these tables and their iinformation in rows/column
const seedRestaurant = [
  {
    name: 'AppleBees',
    location: 'Texas',
    cuisine: 'FastFood'
  },
  {
    name: 'LittleSheep',
    location: 'Dallas',
    cuisine: 'Hotpot'
  },
  {
    name: 'Spice Grill',
    location: 'Houston',
    cuisine: 'Indian'
  }
]

const seedMenu = [
  {
    title: 'Breakfast'
  },
  {
    title: 'Lunch'
  },
  {
    title: 'Dinner'
  },
]

const seedItem = [
  {
    name: 'bhindi masala',
    image: 'someimage.jpg',
    price: 9.50,
    vegetarian: true
  },
  {
    name: 'egusi soup',
    image: 'someimage.jpg',
    price: 10.50,
    vegetarian: false
  },
  {
    name: 'hamburger',
    image: 'someimage.jpg',
    price: 6.50,
    vegetarian: false
  }
]

//Q: Try to decifer the following function.
//A: Looks like we're trying to create tables in our database with our preset data
//Q: Why are we using async and await?
//A: We don't want to hold up the rest of the program while we interact with the database
const seed = async () => {
  try {
    await sequelize.sync({force: true})
    await Restaurant.bulkCreate(seedRestaurant, {validate: true}) //bulk add multiple objects to the table
    await Menu.bulkCreate(seedMenu, {validate: true})
    await Item.bulkCreate(seedItem, {validate: true})
    console.log('Seeding success!')
    sequelize.close()
  } catch (error) {
    console.log('SOMETHING WENT WRONG WITH THE SEEDING: ', error)
  }
}

//Q: What is seed() returning?
//A: seed is returning a resolved or rejected promise
seed()
    .then(() => {
      console.log('Seeding success!')
    })
    .catch(err => {
      console.error('Oh noes! Something went wrong!')
      console.error(err)
    })

