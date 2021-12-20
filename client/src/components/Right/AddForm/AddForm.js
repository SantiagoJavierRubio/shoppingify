import { useSelector, useDispatch } from 'react-redux';
import { setRightView } from '../../../redux/ducks/views';
import { createProduct } from '../../../redux/ducks/products';
import { useState, useEffect } from 'react';
import Selector from './Selector/Selector';
import './AddForm.css';

const AddForm = () => {

    const dispatch = useDispatch();
    
    // For styling on focus or error
    const [focused, setFocus] = useState(null);
    
    // Category selector functions
    const products = useSelector((state) => state.products)
    const [categoryOptions, setOptions] = useState([]);
    const handleFocus = (e) => {
        setFocus(e.target.id)
    }
    const updateCategories = () => {
        const newList = [...new Set(products.map(product => product.category))];
        setOptions(newList);
    }
    useEffect(() => {
        updateCategories()
    }, [products])

    // Main form function
    const handleAddProduct = (e) => {
        e.preventDefault();
        const userInput = {
            name: e.target.itemName.value,
            category: e.target.selectorInput.value,
            about: e.target.itemNote.value || null,
            img: e.target.itemImg.value || null
        }
        dispatch(createProduct(userInput));
        dispatch(setRightView('menu'));
    }

    const handleCancel = (e) => {
        e.preventDefault();
        dispatch(setRightView('menu'));
    }
    
    return(
        <div id="product-add">
            <h6 className="addNewProductTitle">Add a new item</h6>
            <form onSubmit={handleAddProduct} id="add-item-form" autoComplete='off'>
                <div className={`inputType ${focused==='itemName' ? 'hasFocus' : null}`} onFocus={handleFocus}>
                    <label htmlFor="itemName">Name</label>
                    <input type="text" id="itemName" name="itemName" placeholder="Enter a name" required maxLength={50}/>
                </div>
                <div className={`inputType ${focused==='itemNote' ? 'hasFocus' : null}`} onFocus={handleFocus}>
                    <label htmlFor="itemNote">Note (optional)</label>
                    <textarea id="itemNote" name="itemNote" rows={5} placeholder="Enter a note" maxLength={300}/>
                </div>
                <div className={`inputType ${focused==='itemImg' ? 'hasFocus' : null}`} onFocus={handleFocus}>
                    <label htmlFor="itemImg">Image (optional)</label>
                    <input type="text" id="itemImg" name="itemImg" placeholder="Enter a url" />
                </div>
                <div className={`inputType ${focused==='selector-input' ? 'hasFocus' : null}`} onFocus={handleFocus}>
                    <label htmlFor="selector-input">Category</label>
                    <Selector options={categoryOptions}/>
                </div>
                <div className="rightBottomOptions addActions">
                    <button className="primaryButton cancel" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="accentButton add">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddForm;