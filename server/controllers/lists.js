const db = require('../db.js');

const getLists = async (req, res, next) => {
    try {
        db.query('SELECT * FROM Shopping_Lists WHERE user_id = ?', [req.session.userID], (err, results) => {
            if(err) throw err;
            res.status(200).json(results);
        })
    } catch(err) {
        return next(err);
    }
}

const getListDetail = async (req, res, next) => {
    const requiredList = req.query.id;
    const listData = {
        ID: requiredList,
        name: null,
        products: []
    }
    try{
        db.query('SELECT * FROM Shopping_Lists WHERE ID = ?', [requiredList], (err, result) => {
            if(err) throw err;
            listData.name = result[0]?.name;
        })
        db.query('SELECT product_id FROM Shopping_List_Products WHERE list_id = ?', [requiredList], (err, results) => {
            if(err) throw err;
            const productIDs = results.map(result => {
                return result.product_id
            })
            db.query('SELECT * FROM Products WHERE ID IN (?)', productIDs, (error, products) => {
                if(error) throw err;
                listData.products = [...products]
                res.status(200).json(listData);
            })
        })
    } catch(err) {
        return next(err);
    }
}

const createList = (req, res, next) => {
    const userInput = req.body;
    const date = new Date().toISOString().slice(0,19).replace('T', ' ');
    const listData = {
        ID: null,
        user_id: req.session.userID,
        name: userInput.name,
        date
    }
    try{
        db.execute(db.format('INSERT INTO Shopping_Lists SET ?', listData), (err, result) => {
            if(err) throw err;
            const listProducts = userInput.products.map(product => {
                return [result.insertId, product.id, product.ammount]
            })
            db.execute(db.format('INSERT INTO Shopping_List_Products (list_id, product_id, ammount) VALUES ?', [listProducts]), (error, results) => {
                if(error) throw error;
                res.status(200).json({ message: 'List added successfully! '});
            })
        })
    } catch(err) {
        return next(err);
    }
}

const deleteList = (req, res, next) => {

}

module.exports = { getLists, getListDetail, createList, deleteList }