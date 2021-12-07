import { ReactComponent as Bottle } from './bottle.svg';
import './AddItem.css';

const AddItem = () => {

    return(
        <div className="addItemBox">
            <Bottle id="bottle-logo" />
            <div className="addOptions">
                <p>Didn't find what you need?</p>
                <button className="primaryButton" id="add-item-button">Add item</button>
            </div>
        </div>
    )
}

export default AddItem;