const express = require("express");
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
require('dotenv').config();

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

app.use('/api/auth',authRoute);
app.use('/api/drinks',drinksRoute);


app.use("*",(req,res) => {
    res.send("hello");
});
app.listen(PORT, () => {
    console.log('Server on ', PORT)
})