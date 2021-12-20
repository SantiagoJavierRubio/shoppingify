import { useState, useEffect, useRef } from 'react';
import './Selector.css';

const Selector = ({ options }) => {

    const [isActive, setActive] = useState(false);
    const [optionList, setOptions] = useState(options);

    useEffect(() => {
        setOptions(options);
    }, [options]);

    const handleInputClick = () => {
        if(isActive) return;
        return setActive(true);
    }

    const handleInput = (e) => {
        if(!e.target.value) return;
        const newOptions = options.filter(option => option.includes(e.target.value));
        return setOptions(newOptions);
    }

    const handleListSelect = (val) => {
        document.querySelector('#selector-input').value = val;
        return setActive(false);
    }

    // close on outside click
    const itemRef = useRef(null);
    useEffect(() => {

        const handleClickOutside = e => {
            if(itemRef.current && !itemRef.current.contains(e.target)) {
                setActive(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [itemRef])

    return(
        <div id="selector-main" ref={itemRef}>
            <input 
                type='text'
                id="selector-input"
                name="selectorInput"
                onClick={handleInputClick}
                onChange={handleInput}
                placeholder="Enter a category"
                maxLength={50}
                required
            />
            {isActive && <div id="selector-dropdown">
                {optionList?.length > 0 ? 
                    <>
                    {optionList.map(option => {
                        return(
                            <button key={option} onClick={() => handleListSelect(option)} className="selectorOptionButton">
                                {option}
                            </button>
                        )
                    })}
                    </>
                    :
                    <p>No results</p>
                }
            </div>}
        </div>
    )
}

export default Selector;