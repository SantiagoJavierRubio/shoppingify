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

const completeProductData = (prods, res) => {
    return prods.map(product => {
        let match = res.find(p => p.product_id === product.ID);
        return {...product, ammount: match.ammount}
    })
}

const getListDetail = async (req, res, next) => {
    const requiredList = req.query.id;
    const listData = {
        ID: requiredList,
        name: null,
        products: [],
        date: null
    }
    try{
        db.query('SELECT * FROM Shopping_Lists WHERE ID = ?', [requiredList], (err, result) => {
            if(err) throw err;
            if(!result[0]){
                const notFound = new Error('List not found');
                notFound.status = 404;
                return next(notFound)
            }
            listData.name = result[0].name;
            listData.date = result[0].date
        })
        db.query('SELECT * FROM Shopping_List_Products WHERE list_id = ?', [requiredList], (err, results) => {
            if(err){
                let notFound = new Error('No items on this list');
                notFound.status = 404;
                return next(notFound)
            };
            const productIDs = results.map(result => {
                return result.product_id
            })
            db.execute(db.format('SELECT * FROM Products WHERE ID IN (?)', [productIDs]), (error, products) => {
                if(error) throw err;
                const fullProducts = completeProductData(products, results)
                listData.products = [...fullProducts]
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
        date,
        state: 'pending'
    }
    try{
        db.execute(db.format('INSERT INTO Shopping_Lists SET ?', listData), (err, result) => {
            if(err) throw err;
            const listProducts = userInput.products.map(product => {
                return [result.insertId, product.id, product.ammount]
            })
            db.execute(db.format('INSERT INTO Shopping_List_Products (list_id, product_id, ammount) VALUES ?', [listProducts]), (error, results) => {
                if(error) throw error;
                res.status(200).json({ message: 'List added successfully!' });
            })
        })
    } catch(err) {
        return next(err);
    }
}

const setActiveList = (req, res, next) => {
    const id = req.body.id;
    try {
        db.execute(db.format('UPDATE Shopping_Lists SET state = `pending` WHERE state = `active`'), (err, result) => {
            if(err) throw err
        })
        db.execute(db.format('UPDATE Shopping_Lists SET state = `active` WHERE ID = ?', [id]), (err, result) => {
            if(err) throw err;
            if(!result[0]){
                const notFound = new Error('List not found');
                notFound.status = 404;
                return next(notFound)
            }
            res.status(200).json(result.insertId)
        })
    } catch(error) {
        return next(error)
    }
}

const setCompletedList = (req, res, next) => {
    const id = req.body.id;
    try {
        db.execute(db.format('UPDATE Shopping_Lists SET state = `completed` WHERE ID = ?', [id]), (err, result) => {
            if(err) throw err;
            if(!result[0]){
                const notFound = new Error('List not found');
                notFound.status = 404;
                return next(notFound)
            }
            res.status(200).json(result.insertId)
        })
    } catch(error) {
        return next(error)
    }
}

const setCancelledList = (req, res, next) => {
    const id = req.body.id;
    try {
        db.execute(db.format('UPDATE Shopping_Lists SET state = `cancelled` WHERE ID = ?', [id]), (err, result) => {
            if(err) throw err;
            if(!result[0]){
                const notFound = new Error('List not found');
                notFound.status = 404;
                return next(notFound)
            }
            res.status(200).json(result.insertId)
        })
    } catch(error) {
        return next(error)
    }
}

const deleteList = (req, res, next) => {
    const toDelete = req.body.id
    try {
        db.query('SELECT * FROM Shopping_Lists WHERE ID = ?', [toDelete], (err, results) => {
            if(err) throw err
            if(!results[0]){
                const notFound = new Error('List not found');
                notFound.status = 404;
                return next(notFound)
            }
            if(results[0].user_id !== req.session.userID){
                const notAuthorized = new Error("You're not authorized to delete this element");
                notAuthorized.status = 401;
                return next(notAuthorized);
            }
            db.execute('DELETE FROM Shopping_Lists WHERE ID = ?', [toDelete], (error, result) => {
                if(error) throw error;
                res.status(200).json({ message: 'List deleted' });
            })
        })
    } catch(err) {
        return next(err);
    }
}

module.exports = { getLists, getListDetail, createList, deleteList, setActiveList, setCancelledList, setCompletedList }