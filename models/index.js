const {sequelize} = require('../db')
const {Restaurant} = require('./Restaurant')
const {Menu} = require('./Menu')
const {Item} = require('./Item')

//associations - What are they?
//relationships between tables
Menu.belongsTo(Restaurant) //Q: What will .belongsTo provide Menu?
                        //A: foreign key defined in A, Menu
Restaurant.hasMany(Menu)

Item.belongsTo(Menu)
Menu.hasMany(Item) // what does hasMany provide for us?
                    //A: foreign key being defined in target model B, Item

module.exports = { Restaurant, Menu, Item } //exporting models w/ associations
