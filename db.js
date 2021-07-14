const { Sequelize } = require('sequelize'); //Q: Why is this Sequelize capitalized?
                                            //A: calling the library named Sequelize
const path = require('path'); //a node native module

//Q: What are we creating down below?
//A: creating a database named sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'), //quick way to get the path for our db
                                                //dirname provides absolute path of current executing file
                                                //we're just adding db.sqlite to the end of it
});

//Q: Why are we exporting lowercase sequelize?
//A: Because we named our database lowercase sequelize
module.exports = {sequelize};
