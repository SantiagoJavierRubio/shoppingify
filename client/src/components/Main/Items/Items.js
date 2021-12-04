import { useDispatch } from 'react-redux';
import { addItem, changeItemQuantity } from '../../../redux/ducks/itemList';

const Items = () => {

    const dispatch = useDispatch()

    const handleAddItem = (i) => {
        if(i === 1) dispatch(addItem({id: 2, name: 'prueba'}))
        if(i === 2) dispatch(addItem({id: 3, name: 'prueba2'}))
    }

    return(
        <>
        <header>
            <h2>
                <span>Shoppingify</span> allows you to take your shopping list wherever you go
            </h2>
        </header>
        <div>
            <button onClick={() => handleAddItem(1)}>ADD PRUEBA</button>
            <button onClick={() => handleAddItem(2)}>ADD BOBI</button>
            {/* Destructure every category with every item each in a button with an add option and show info on click */}
        </div>
        </>
    )
}

export default Items;