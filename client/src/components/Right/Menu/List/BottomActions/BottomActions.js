import { useSelector } from 'react-redux';
import BottomEdit from './BottomEdit';
import BottomShop from './BottomShop';

import './BottomActions.css';

const BottomActions = () => {
    const isEditing = useSelector((state) => state.views.editMode);

    return(
        <>
        {isEditing ? <BottomEdit /> : <BottomShop />}
        </>
    )
}

export default BottomActions;