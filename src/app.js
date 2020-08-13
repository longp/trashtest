const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

require('dotenv').config();
const PORT = process.env.PORT || 3000

//db connect
mongoose.connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(morgan('tiny'));

//routes
const authRoute = require('./routes/auth');
const drinksRoute = require('./routes/drinks');
const foodsRoute = require('./routes/foods');
const productsRoute = require('./routes/products');


app.use('/api/auth',authRoute);
app.use('/api/drinks',drinksRoute);
app.use('/api/foods',foodsRoute);
app.use('/api/products',productsRoute);


app.use("*",(req,res) => {
    res.send("hello world");
});
app.listen(PORT, () => {
    console.log('Server on ', PORT)
})