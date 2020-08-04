const router = require('express').Router();
const { getFood, getFoods, createFood, deleteFood } = require('../controllers/foodController')
const checkJwt = require('../middlewares/checkJwt')

router.post('/',checkJwt, createFood);
router.get('/search',checkJwt, getFoods);
router.get('/:foodID',checkJwt, getFood);
router.delete('/:foodID',checkJwt,deleteFood);

module.exports = router