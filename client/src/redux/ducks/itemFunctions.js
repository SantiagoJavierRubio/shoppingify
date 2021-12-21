// returns the shopping list with the new item incorporated
export const addItemToCart = (state, item) => {
    if(!state.shoppingList.find(it => it.ID === item.ID)) return [...state.shoppingList, {...item, ammount: 1}]
    return state.shoppingList.map(it => {
        if(it.ID === item.ID) return { ...it, ammount: it.ammount+1 }
        return it
    })
}

// returns the shopping list without the item and removes the category if it was its last item.
export const removeItemFromCart = (state, item) => {
    return state.shoppingList.filter(it => item.ID !== it.ID)
}

// returns the shopping list with the substracted or added item.
export const itemAddOrSubstract = (state, item, sum) => {
    // if item quantity comes to 0 calls the remove item func to delete its instance.
    if(sum < 0 && item.ammount <= 1) return removeItemFromCart(state, item)

    return state.shoppingList.map(it => {
        if(it.ID === item.ID) return {...it, ammount: it.ammount+sum}
        return it
    })
}
