const db = require('../db.js');

const getLists = async (req, res, next) => {
    try {
        db.query('SELECT * FROM Shopping_Lists WHERE user_id = ? AND state <> ?', [req.session.userID, 'active'], (err, results) => {
            if(!results[0]) return res.status(200).json({ message: 'No lists found' })
            if(err) throw err;
            return res.status(200).json(results);
        })
    } catch(err) {
        return next(err);
    }
}

const getActiveList = (req, res, next) => {
    try {
        db.query('SELECT * FROM Shopping_Lists WHERE user_id = ? AND state = ?', [req.session.userID, 'active'], (err, results) => {
            if(!results[0]) return res.status(200).json({ message: 'No lists found' })
            if(err) throw err;
            res.status(200).json(results[0]);
        })
    } catch(err) {
        return next(err);
    }
}

const completeProductData = (prods, res) => {
    return prods.map(product => {
        let match = res.find(p => p.product_id === product.ID);
        return {...product, ammount: match.ammount, checked: match.checked}
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
                if(error){
                    let notFound = new Error('No items on this list');
                    notFound.status = 404;
                    return next(notFound)
                };
                const fullProducts = completeProductData(products, results)
                listData.products = [...fullProducts]
                res.status(200).json(listData);
            })
        })
    } catch(err) {
        return next(err);
    }
}

const deleteActive = (req, res, next) => {
    db.execute(db.format('DELETE FROM Shopping_Lists WHERE `user_id` = ? AND `state` = ?', [req.session.userID, 'active']), (err, result) => {
        if(err) throw err;
        if(result) return res.status(200).json({ message: 'Active list deleted' });
        return res.status(200).json({ message: 'No active list was found' })
    })
}

const createList = (req, res, next) => {
    const userInput = req.body;
    const date = new Date().toISOString().slice(0,19).replace('T', ' ');
    const listData = {
        ID: null,
        user_id: req.session.userID,
        name: userInput.name,
        date,
        state: 'active'
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

const setCompletedList = (req, res, next) => {
    try {
        db.execute(db.format('UPDATE Shopping_Lists SET state = ? WHERE user_id = ? AND state = ?', ['completed', req.session.userID, 'active']), (err, result) => {
            if(err) throw err;
            if(result.changedRows === 0){
                return res.status(200).json({ message: 'No list to complete' })
            }
            return res.status(200).json({message: 'List completed!'})
        })
    } catch(error) {
        return next(error)
    }
}

const setCancelledList = (req, res, next) => {
    try {
        db.execute(db.format('UPDATE Shopping_Lists SET state = ? WHERE user_id = ? AND state = ?', ['cancelled', req.session.userID, 'active']), (err, result) => {
            if(err) throw err;
            if(result.changedRows === 0){
                return res.status(200).json({ message: 'No list to cancel' })
            }
            return res.status(200).json({ message: 'List cancelled!' });
        })
    } catch(error) {
        return next(error)
    }
}

const checkItem = (req, res, next) => {
    const params = [req.body.status, req.body.id]
    try {
        db.execute('UPDATE Shopping_List_Products SET `checked` = ? WHERE `product_id` = ?', params, (err, result) => {
            if(err) throw err;
            return res.status(200).json(result.insertId)
        })
    } catch(err) {
        return next(err);
    }
}

module.exports = { getLists, getListDetail, createList, getActiveList, setCancelledList, setCompletedList, deleteActive, checkItem }