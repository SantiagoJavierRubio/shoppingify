import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Item from './Item/Item';
import './Items.css';

const Items = () => {

    const items = useSelector((state) => state.products);
    const isEditing = useSelector((state) => state.views.editMode);
    const shoppingList = useSelector((state) => state.items.shoppingList)
    const [itemsByCategories, setCategories] = useState([]);


    const filterItems = (IDList) => {
        return items.filter(item => IDList.includes(item.ID))
    }

    // create a list by categories
    const sortItems = (itemList) => {
        const categories = [...new Set(itemList.map(item => item.category))]
        const byCategories = []
        categories.forEach(category => {
            byCategories.push({
                category,
                items: itemList.filter(item => item.category === category)
            })
        })
        setCategories(byCategories);
    }

    // re-render item list on change edit mode or item list :::Pending: filter component
    useEffect(()=> {
        if(!items) return
        let itemList = [...items]
        if(!isEditing) itemList = filterItems([...shoppingList.map(item => item.ID)]);
        sortItems(itemList);
    }, [items, isEditing])

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