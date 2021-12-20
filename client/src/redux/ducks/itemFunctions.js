// returns the shopping list with the new item incorporated
export const addItemToCart = (state, item) => {

    // check if item's category is already on the cart and if its not there adds it
    const hasCategory = (state.shoppingList.find(it => it.category === item.category))
    if(!hasCategory) {
        return [...state.shoppingList, { category: item.category, items: [{...item, ammount: 1}] }]
    }

    return state.shoppingList.map(category => {
        if(category.category !== item.category) return category

        // if the item is not present already in the category adds it
        if(!category.items.find(i => i.ID === item.ID)) {
            return { category: category.category, items: [...category.items, {...item, ammount: 1}]}
        }

        // add one to the ammount value of the item
        const updatedCategoryList = category.items.map(it => {
            if(it.ID !== item.ID) return it
            return { ...it, ammount: it.ammount + 1 }
        })
        return { category: category.category, items: updatedCategoryList}
    })

}

// returns the shopping list without the item and removes the category if it was its last item.
export const removeItemFromCart = (state, item) => {
    const newList = state.shoppingList.map(category => {
        if(category.category !== item.category) return category
        if(category.items.length <= 1) return;
        return { category: category.category, items: category.items.filter(it => it.ID !== item.ID) }
    })
    // filter category if empty
    return newList.filter(a => a)
}

// returns the shopping list with the substracted or added item.
export const itemAddOrSubstract = (state, item, sum) => {
    // if item quantity comes to 0 calls the remove item func to delete its instance.
    if(sum < 0 && item.ammount <= 1) return removeItemFromCart(state, item)

    return state.shoppingList.map(category => {
        if(category.category !== item.category) return category
        const updatedItems = category.items.map(it => {
            if(it.ID !== item.ID) return it
            return { ...it, ammount: it.ammount + sum }
        })
        return { category: category.category, items: updatedItems }
    })
}