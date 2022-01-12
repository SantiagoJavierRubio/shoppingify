import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Item from './Item/Item';
import './Items.css';

const Items = () => {

    const items = useSelector((state) => state.products);
    const isEditing = useSelector((state) => state.views.editMode);
    const shoppingList = useSelector((state) => state.items.shoppingList)
    const [itemsByCategories, setCategories] = useState([]);
    const [searchFilter, setSearchFilter] = useState('');


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
        let filteredItemList = filterBySearch(itemList)
        sortItems(filteredItemList);
    }, [items, isEditing, searchFilter])

    const handleSearchInput = e => {
        setSearchFilter(e.target.value.toUpperCase())
    }

    const filterBySearch = (list) => {
        return list.filter(it => it.name.toUpperCase().includes(searchFilter))
    }

    return(
        <>
        <header id="items-main-header">
            <h2>
                <span>Shoppingify</span> allows you to take your shopping list wherever you go
            </h2>
            <div id="search-bar">
                <div className="inputBar">
                    <span className='material-icons'>search</span>
                    <input type="text" onChange={handleSearchInput} placeholder='search item'/>
                </div>
            </div>
        </header>
        {itemsByCategories.length > 0 ?
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
        </div>
        :
        <div className="noItemsErrorDisplay">
            <h5>No items found</h5>
        </div>
        }
        </>
    )
}

export default Items;