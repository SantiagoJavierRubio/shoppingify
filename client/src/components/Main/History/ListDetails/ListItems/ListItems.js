import { useEffect, useState } from 'react';
import Item from './Item/Item';
import './ListItems.css';

const ListItems = ({ items }) => {

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
        <div id="list-items">
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
        </div>
    )
}

export default ListItems