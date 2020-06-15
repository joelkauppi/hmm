const defaultFilter = ''
const initialState = defaultFilter

const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'FILTER_CHANGE':
            return action.filter
        default:
            return state
    }
}


export const filterChange = (value) => {
    return {
        type: 'FILTER_CHANGE',
        filter: value
    }
}


export default filterReducer