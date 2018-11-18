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

Pug.prototype.isPuppy = function(){
  return this.age < 1; 
};

Pug.prototype.shortBio = function(){
  const delims = /[.!?]/; // regex used to split on . | ! | ?
  return this.biography.split(delims)[0];
};

module.exports = Pug;
