let timeOutId 

const defaultNotification = ''
const initialState = {
    message: defaultNotification,
    visible: false,
}

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW_NOTIFICATION':
            return {
                visible: true,
                message: action.message
            }
        case 'HIDE_NOTIFICATION':
            timeOutId = ''
            return {
                visible: false,
                message: action.message
            }
        default:
            return state
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION',
        message: ''
    }
}

export const showNotification = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        message: message
    }
}

export const setNotification = (message, time) => {
    if (timeOutId) {
        clearTimeout(timeOutId)
    }
    return async dispatch => {
        const notification = await message
        dispatch({
            type: 'SHOW_NOTIFICATION',
            message: notification
        })
        timeOutId = setTimeout(() => { 
            dispatch({
                type: 'HIDE_NOTIFICATION',
                message: ''
            })}, time*1000)
    }
    
}


export default notificationReducer