import { useSelector } from 'react-redux';

const List = () => {

    const items = useSelector((state) => state.items.shoppingList);

    return(
        <article>
            <h5>Shopping list</h5>
            {/* Add categories with each item and qtity */}
            <ul>
            {items?.map(item => (
                <li key={item.id}>{item.name}: {item.ammount}</li>
            ))}
            </ul>
        </article>
    )
}

export default List;