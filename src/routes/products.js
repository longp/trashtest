const router = require('express').Router();
const {getProducts } = require('../controllers/productController')
const checkJwt = require('../middlewares/checkJwt')

router.get('/search',checkJwt, getProducts);

module.exports = router