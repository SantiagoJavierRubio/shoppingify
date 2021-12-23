import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Item from './Item/Item';
import './Items.css';

const Items = () => {

    const items = useSelector((state) => state.products)
    const [itemsByCategories, setCategories] = useState([]);

    useEffect(()=> {
        if(!items) return
        const categories = [...new Set(items.map(item => item.category))]
        const byCategories = []
        categories.forEach(category => {
            byCategories.push({
                category,
                items: items.filter(item => item.category === category)
            })
        })
        setCategories(byCategories);
    }, [items])

    return(
        <>
        <header>
            <h2>
                <span>Shoppingify</span> allows you to take your shopping list wherever you go
            </h2>
        </header>
        {itemsByCategories.length > 0 &&
        <div id='main-category-list'>
            {itemsByCategories.map(category => {
                return <div className='category' key={category.category}>
                            <h5>{category.category}</h5>
                            <div className="categoryItemList">
                            {category.items.map(item => {
                                return <Item item={item} key={item.ID} />
                            })}
                            </div>
                        </div>
                })}
        </div>}
        </>
    )
}

export default Items;