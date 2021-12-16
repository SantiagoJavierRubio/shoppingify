const db = require('../db.js');
const bcrypt = require('bcryptjs');
const { createValidationCode } = require('./userValidation.js')


const createUser = async (req, res, next) => {
    const userInput = req.body;
    try{
        bcrypt.genSalt(10, (saltError, salt) =>  {
            if(saltError) throw saltError;
            bcrypt.hash(userInput.password, salt, (hashError, hash) => {
                if(hashError) throw hashError;
                registerNewUser(hash);
            })
        })
    
        const registerNewUser = (hashedPassword) => {
            const date = new Date().toISOString().slice(0,19).replace('T', ' ');
            const userData = {
                ID: null,
                email: userInput.email,
                join_date: date,
                password: hashedPassword,
                validated: false
            }
            db.execute(db.format('INSERT INTO Users SET ?', userData), (err, result) => {
                if(err){
                    if(err.code === 'ER_DUP_ENTRY') {
                        const error = new Error('Mail already in use');
                        error.status = 400
                        return next(error);
                    }
                };
                createValidationCode(result.insertId, userData.email);
                res.status(201).json(result.insertId);
            })
    
        }
    } catch (err) {
        return next(err);
    }
}

const checkUser = async (req, res, next) => {
    try{
        if(req.session.loggedIn) {
            db.query('SELECT * FROM Users WHERE ID = ?', [req.session.userID], (err, result) => {
                if(err) throw err;
                let userData = {...result[0]}
                delete userData.password;
                return res.status(200).json(userData)
            })
        } else {
            return res.json(null)
        }
    } catch(err) {
        const error = new Error(`Authorization error: ${err.message}`);
        error.status = 400
        return next(error);
    }
}

const authUser = async (req, res, next) => {
    const userInput = req.body;
    try{
        db.query('SELECT * FROM Users WHERE email = ?', [userInput.email], (err, result) => {
            if(err) throw err;
            if(!result[0]) {
                const error = new Error('User not found')
                error.status = 404;
                return next(error);
            }
            if(!result[0].validated) {
                const error = new Error('Mail not validated')
                error.status = 404;
                return next(error);
            }
            bcrypt.compare(userInput.password, result[0].password, (err, isMatch) => {
                if(err) throw err;
                if(!isMatch) return res.status(401).json({ error: 'wrongPassword', message: 'Incorrect password!' })
                let userData = {...result[0]}
                delete userData.password;
                req.session.loggedIn = true;
                req.session.userID = userData.ID;
                res.status(200).json(userData)
            })
        })
    } catch(err) {
        const error = new Error(`Authorization error: ${err.message}`);
        error.status = 400
        return next(error);
    }
}

const logOut = async (req, res, next) => {
    try {
        req.session.loggedIn = false;
        req.session.destroy((err) => {
            if(err) throw err;
            res.status(200).json({ message: 'Logged out successfully' })
        })
    } catch(err) {
        next(err);
    }
}

const isAuthorized = async(req, res, next) => {
    if(req.session.userID) return next();
    const err = new Error('No user');
    err.status = 401;
    return next(err);
}

module.exports = { createUser, authUser, logOut, isAuthorized, checkUser }