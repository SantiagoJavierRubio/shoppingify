

const Details = () => {

    return(
        <article>
            <button>
                <span className="material-icons">keyboard_backspace</span>
                back
            </button>
            {/* Get img from item element */}
            <img src="http://placehold.it/200x150" />
            {/* Add item name, category and description */}
            <div>
                <button>delete</button>
                <button>Add to list</button>
            </div>
        </article>
    )
}

export default Details;