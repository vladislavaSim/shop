export function cartReducer(state = {}, {type, good, count = 1}) {

    if(type === 'ADD_GOOD') {
        return {...state,
                    [good.name] : {
                         good,
                         count: good.name in state ? state?.[good.name]?.count + count : count
                        }
                }
    }
    if(type === 'REMOVE_GOOD') {
            const copy = {...state}
            delete copy[good.name]
            return copy
    }
    if('UPDATE_GOOD') {
         if(good?.name) {
             return {...state,
                 [good?.name] : {
                     good,
                     count
                 }
             }
         }
    }
    if(type === 'CLEAR_CART') {
        return {}
    }
    return state
}
