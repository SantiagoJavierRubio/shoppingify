const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');

const userRoutes = require('./routes/users.js');
const productRoutes = require('./routes/products.js');
const listRoutes = require('./routes/lists.js');

const app = express();
dotenv.config();

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
}))
app.use(express.json());
app.use(cors({ credentials: true }));

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("Welcome to Shoppingify's backend")
})

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/lists', listRoutes);

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json(err.message);
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})