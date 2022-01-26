const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const session = require('express-session');
const sessionStore = require('express-session-rsdb')


const userRoutes = require('./routes/users.js');
const productRoutes = require('./routes/products.js');
const listRoutes = require('./routes/lists.js');
const statsRoutes = require('./routes/stats.js');

const app = express();
dotenv.config();

app.set('trust proxy', 1);
app.use(session({
    store: new sessionStore(),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 24, secure: true, sameSite: 'none' }
}))
app.use(express.json());
app.use(cors({ credentials: true, origin: 'https://shoppingify-sjr.netlify.app' }));

const PORT = process.env.PORT || 5000;


app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/lists', listRoutes);
app.use('/stats', statsRoutes);

// error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500).json({ message: err.message });
});

app.get('/', (req, res) => {
    res.send("Welcome to Shoppingify's backend")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})