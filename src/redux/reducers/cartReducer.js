export function cartReducer(state = {}, {type, good, count = 1}) {

    if(type === 'ADD_GOOD') {
        return {...state,
                    [good.name] : {
                         good,
                         count: good.name in state ? state?.[good.name]?.count + count : count
                        }
                }
    }
    // if(type === 'REMOVE_GOOD') {
    //     return {...state,
    //         [good.name] : {
    //         good,
    //             count: state?.[good.name]?.count - 1 : count
    //         }
    //     }
    // }
    return state
}