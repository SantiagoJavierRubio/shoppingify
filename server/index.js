const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const db = require('./db.js');


const userRoutes = require('./routes/users.js');
const productRoutes = require('./routes/products.js');
const listRoutes = require('./routes/lists.js');
const statsRoutes = require('./routes/stats.js');

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.set('trust proxy', 1);
const sessionStore = new MySQLStore({}, db.promise())
app.use(session({
    store: sessionStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        maxAge: 1000 * 60 * 24,
        secure: true,
        sameSite: 'none',
        httpOnly: false,
    }
}))
app.use(cors({ credentials: true, origin: ['https://shoppingify-sjr.netlify.app', 'https://santiagojavierrubio.herokuapp.com'] }));

const PORT = process.env.PORT || 5000;

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/lists', listRoutes);
app.use('/stats', statsRoutes);

app.use(function(req, res, next){
    res.set('credentials', 'include');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
})


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
