const db = require('../db.js');

const createProduct = async (req, res, next) => {
    const userInput = req.body;
    const id = req.session.userID;
    try {
        const productData = {
            ID: null,
            user_id: id,
            name: userInput.name,
            category: userInput.category,
            about: userInput.about,
            img: userInput.img
        }
        db.execute(db.format('INSERT INTO Products SET ?', productData), (err, result) => {
            if(err) throw err;
            res.status(201).json(result.insertId)
        })
    } catch(err) {
        return next(err);
    }
}

const getProducts = async (req, res, next) => {
    try {
        db.query('SELECT * FROM Products WHERE user_id = ?', [req.session.userID], (err, results) => {
            if(err) throw err;
            res.status(200).json(results)
        })
    } catch(err) {
        return next(err);
    }
}

const deleteProduct = async (req, res, next) => {
    const productID = req.body.id;
    db.execute('DELETE FROM Products WHERE ID = ?', [productID], (err, result) => {
        if(err) return next(err);
        res.status(200).json({ message: 'Item deleted' });
    })
}


module.exports = { createProduct, getProducts, deleteProduct }