const router = require('express').Router()
const {Pug} = require('../models')

// Your code here!
// Remember that these routes are already mounted on
// /api/pugs!

router.get('/', async function (req, res, next){
    try {
        const allPugs = await Pug.findAll({
            include: [{all:true}]
        });
        res.send(allPugs);
    } catch (error) {
        next(error);
    }
});

router.post('/', async function(req, res, next){
    // console.log(req.body);
    try {
        const newPug = await Pug.create(req.body);
        res.status(201);
        res.send(newPug);
    } catch (error) {
        next(error);
    }
});

router.get('/favoriteCoffee/:favoriteCoffeeName', async function(req, res, next){
    try {
        const pugsWhoLike = await Pug.findByCoffee(req.params.favoriteCoffeeName);
        res.send(pugsWhoLike);
    } catch (error) {
        next(error);
    }
});

router.get('/:pugId', async function(req, res, next){
    try {
        const pugOfId = await Pug.findOne({
            where:{
                id: req.params.pugId
            }
        });
        !pugOfId ? res.sendStatus(404) : res.send(pugOfId);
    } catch (error) {
        next(error);
    }
});

router.put('/:pugId', async function(req, res, next){
    // console.log(req.body);
    // console.log(req.params);
    try {
        const pugToUpdate = await Pug.findOne({where: {id: req.params.pugId}});
        if(!pugToUpdate){
            res.sendStatus(404);
        }
        else{
            const updatedPug = await pugToUpdate.update(req.body);
            res.send(updatedPug);
        }
    } catch (error) {
        next(error);
    }
});

router.delete('/:pugId', async function(req, res, next){
    try {
        const pugToDel = await Pug.findOne({
            where:{
                id: req.params.pugId
            }
        });  
        if(!pugToDel){
            res.sendStatus(404);
        }
        else{
            await pugToDel.destroy();
            res.sendStatus(204);
        }
    } catch (error) {
        next(error);
    }
});



module.exports = router;
