

const AddForm = () => {

    return(
        <div>
            <h6>Add a new item</h6>
            <form>
                <label htmlFor="itemName" />
                <input type="text" id="itemName" name="itemName" />
                <label htmlFor="itemNote" />
                <input type="text" id="itemNote" name="itemNote" />
                <label htmlFor="itemImg" />
                <input type="text" id="itemImg" name="itemImg" />
                <label htmlFor="itemCategory" />
                <input type="text" id="itemCategory" name="itemCategory" list="categories"/>
                <datalist id="categories">
                    {/* Destructure available categories */}
                    <option>category 1</option>
                    <option>category 2</option>
                    <option>category 3</option>
                    <option>...</option>
                </datalist>
                <div>
                    <button>Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddForm;