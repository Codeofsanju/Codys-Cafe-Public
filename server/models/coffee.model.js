const Sequelize = require('sequelize')
const db = require('./database')
const Op = Sequelize.Op;

const Coffee = db.define('coffee', {
  // your code here
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ingredients: Sequelize.ARRAY(Sequelize.STRING)
});

// Adds love to all drinks <3
Coffee.beforeValidate((instance, options) =>{
  const ing = instance.dataValues.ingredients;
  if(!ing.includes('love')){
    ing.push('love');
  }
});



// Gets all ingredients of an instance 
Coffee.prototype.getIngredients = function(){
  return this.ingredients.join(', ');
};

// Finds all coffees with a given ingredient 
Coffee.findByIngredient = async function (ingredient) {
  const coffeeWithIng = await Coffee.findAll({
    where:{
      ingredients: {
        [Op.contains]: [ingredient],
      }
    }
  });
  return coffeeWithIng;
};

module.exports = Coffee;
