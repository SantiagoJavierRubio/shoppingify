import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import ListItemEdit from './ListItem/ListItemEdit';
import ListItemShop from './ListItem/ListItemShop';
import BottomActions from './BottomActions/BottomActions';
import './List.css';

const List = () => {

    const items = useSelector((state) => state.items.shoppingList);
    const isEditing = useSelector((state) => state.views.editMode);
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
        <article id="item-list-main">
            <h5 className="shoppingTitle">Shopping list</h5>
            {items.length > 0 ? 
                <ul id="category-list">
                    {itemsByCategories?.map(category => (
                        <div key={category?.category} className="itemList">
                            <li>
                                <h6 className="categoryTitle">{category?.category}</h6>
                            </li>
                            <ul>
                                {category?.items?.map(item => (
                                    <li key={item?.ID}>
                                        {isEditing ? <ListItemEdit item={item} /> : <ListItemShop item={item} />} 
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </ul>
                :
                <div className="emptyList">
                    <p>No items</p>
                </div>
            }
            <BottomActions />
        </article>
    )
}

export default List;