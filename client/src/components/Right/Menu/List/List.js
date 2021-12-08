import { useSelector } from 'react-redux';
import ListItem from './ListItem/ListItem';
import BottomActions from './BottomActions/BottomActions';
import './List.css';

const List = () => {

    const items = useSelector((state) => state.items.shoppingList);

    return(
        <article id="item-list-main">
            <h5 className="shoppingTitle">Shopping list</h5>
            {items.length > 0 ? 
                <ul id="category-list">
                    {items?.map(category => (
                        <div key={category?.category} className="itemList">
                            <li>
                                <h6 className="categoryTitle">{category?.category}</h6>
                            </li>
                            <ul>
                                {category?.items?.map(item => (
                                    <li key={item?.id}>
                                        <ListItem item={item} />
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
            <BottomActions enabled={items[0] ? true : false} list={items} />
        </article>
    )
}

export default List;