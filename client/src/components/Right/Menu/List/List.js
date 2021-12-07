import { useSelector } from 'react-redux';
import ListItem from './ListItem/ListItem';

const List = () => {

    const items = useSelector((state) => state.items.shoppingList);

    return(
        <article>
            <h5 className="shoppingTitle">Shopping list</h5>
            {/* Add categories with each item and qtity */}
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
        </article>
    )
}

export default List;