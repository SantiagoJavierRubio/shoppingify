const db = require('../db.js');
const database = db.promise()

function mod(n, m) {
    return ((n % m) + m) % m;
}
const monthNames = ["January","February","March","April","May","June","July",
        "August","September","October","November","December"];


const getStats = async(req, res, next) => {

    try {
        // Get all info from Database
        const [lists, ] = await database.query('SELECT * FROM Shopping_Lists WHERE user_id = ? AND DATE_SUB(CURDATE(), INTERVAL 1 YEAR) ORDER BY date DESC', [req.session.userID])
        const listIds = lists.map(list => list.ID)
        const [items, ] = await database.query('SELECT * FROM Shopping_List_Products WHERE list_id IN (?) ORDER BY product_id', [listIds])
        const [products, ] = await database.query('SELECT * FROM Products WHERE user_id = ?', [req.session.userID])
        
        // Group and arrange product data
        let productData = []
        const categories = new Set()
        products.forEach(product => {
            productData = [ ...productData, {
                id: product.ID,
                name: product.name,
                category: product.category,
                ammount: 0
            }]
            categories.add(product.category)
        })
        let topCategories = []
        categories.forEach(category => {
            topCategories = [ ...topCategories, {name: category, ammount: 0} ]
        })
        items.forEach(item => {
            productData.forEach(product => {
                if(product.id === item.product_id){
                    product.ammount += item.ammount
                }
            })
        })
        let total = 0
        topCategories.forEach(category => {
            productData.forEach(product => {
                if(product.category === category.name){
                    category.ammount += product.ammount
                }
            })
            total += category.ammount
        })
        topCategories.sort((a,b) => {
            return b.ammount - a.ammount
        })
        const topItems = productData.sort((a,b) => {
            return b.ammount - a.ammount
        })

        // Group and arrange monthly data
        let listsByMonths = []
        const date = new Date()
        const currentMonth = date.getMonth()
        for(let i=0; i<12; i++){
            let index = mod(currentMonth-i, 12)
            listsByMonths = [ ...listsByMonths, { 
                month: index,
                monthName: monthNames[index],
                lists: lists.filter(l => l.date.getMonth() === index)
                    .map(list => list.ID),
                itemQuantity: 0
            }]
        }
        listsByMonths.forEach(month => {
            month.lists.forEach(listID => {
                items.forEach(item => {
                    if(item.list_id === listID){
                        month.itemQuantity += item.ammount
                    }
                })
            })
            delete month.lists
        })
        
        const stats = {
            topItems: [ ...topItems ],
            topCategories: [ ...topCategories ],
            monthlyItems: [ ...listsByMonths ],
            totalAmmount: total
        }
        console.log(stats)
        res.status(200).json(stats);
    } catch (err) {
        return next(err)
    }

}

module.exports = { getStats };