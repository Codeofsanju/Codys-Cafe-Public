const router = require('express').Router()
const {Coffee} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/coffee!

// api route for all coffees
router.get('/', async function(req, res, next){
    try {
      const allCoffee = await Coffee.findAll({
          include: [{all:true}]
      });
    //   res.status(200);
      res.send(allCoffee);  
    } catch (error) {
        next(error);
    }
});

// coffee by specified id
router.get('/:coffeeId', async function (req, res, next){
    // console.log(req.params.coffeeId);
    try {
        const coffeeById = await Coffee.findOne({
            where: {
                id: req.params.coffeeId
            }
        });
        !coffeeById ? res.sendStatus(404) : res.send(coffeeById);
    } catch (error) {
        next(error);
    }
});

// api route for all coffees with some ingredient 
router.get('/ingredients/:ingredientName', async function(req, res, next){
    // console.log(req.params.ingredientName); 
    try {
        const allCoffeeWithIng = await Coffee.findByIngredient(req.params.ingredientName);
        res.status(200);
        res.send(allCoffeeWithIng);
    } catch (error) {
        next(error);
    }
});





module.exports = router;
