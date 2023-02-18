export const actionAddGood = (good) => {
    return {type: 'ADD_GOOD', good}
}
export const actionRemoveGood = (good) => {
    return {type: 'REMOVE_GOOD', good}
}
export const actionClearCart = () => {
    return {type: 'CLEAR_CART'}
}

