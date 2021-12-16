const db = require('../db.js');
const { v4: uuid } = require('uuid');
const mailer = require('../mailer.js')


const createValidationCode = async (userID, email) => {
    const token = uuid();
    const validationData = {
        user_id: userID,
        token
    }
    try{
        db.execute(db.format('INSERT INTO validations SET ?', validationData), (err, results) => {
            if(err) throw err
            mailer.sendMail({
                from: 'shoppingify.sjr@gmail.com',
                to: email,
                subject: 'Welcome to Shoppingify!',
                html: `
                    <h1>Welcome!</h1>
                    <h4>To complete your registration please <a href="http://localhost:5000/users/validate/?id=${userID}&token=${token}">confirm your email address</a></h4>
                    <p>Thank you!</p>
                `
            })
            return true
        })
    } catch(error) {
        return error
    }

}

const validateUser = (req, res, next) => {
    const id = req.query.id;
    const validationToken = req.query.token;
    try{
        db.query('SELECT token FROM validations WHERE user_id = ?', [id], (err, result) => {
            if(err) throw err;
            if(!result[0]) {
                return res.send('This code is no longer available')
            }
            if(result[0].token === validationToken){
                db.execute(db.format('UPDATE Users SET validated = 1 WHERE ID = ?', [id]), (error, success) => {
                    if(error) throw error;
                    req.session.loggedIn = true;
                    req.session.userID = id;
                    res.redirect('http://localhost:3000/', 301);
                })
            }
        })
    } catch(err) {
        return next(err);
    }
}

module.exports = { createValidationCode, validateUser }