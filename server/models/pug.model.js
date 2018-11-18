const Sequelize = require('sequelize');
const db = require('./database');
const Coffee = require('./coffee.model');

const Pug = db.define('pugs', {
  // your code here
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  biography: Sequelize.TEXT
});


Pug.beforeValidate((instance, option)=>{
  if(instance.name === undefined){
    return;
  } 
  else{
    instance.name = instance.name[0].toUpperCase() + instance.name.slice(1);
  }
});


// instance method that returns true if Pug is less than 1 year old
Pug.prototype.isPuppy = function(){
  return this.age < 1; 
};

// instance method that returns first sentence of bio
Pug.prototype.shortBio = function(){
  const delims = /[.!?]/; // regex used to split on . | ! | ?
  return this.biography.split(delims)[0];
};

// Finds all pugs who's favorite is the passed coffee variable
Pug.findByCoffee = async function(coffee) {
  const pugsOfACoffee = await Pug.findAll({
    include: [{
      model: Coffee, 
      as: 'favoriteCoffee',
      where: {
        name: coffee}
    }],
  });
  return pugsOfACoffee;
};



module.exports = Pug;
