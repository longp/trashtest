const router = require('express').Router();
const { getDrink, getDrinks, createDrink, deleteDrink } = require('../controllers/drinkController')
const checkJwt = require('../middlewares/checkJwt')

router.post('/',checkJwt, createDrink);
router.get('/search',checkJwt, getDrinks);
router.get('/:drinkID',checkJwt, getDrink);
router.delete('/:drinkID',checkJwt,deleteDrink);

module.exports = router