const reducer = (state = { message: null }, action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.notification
  case 'RESET_MESSAGE':
    return { message: null }
  default:
    return state
  }
}

export const setNotification = (message, type) => {
  return {
    type: 'SET_MESSAGE',
    notification: {
      message,
      type
    }
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_MESSAGE'
  }
}

export default reducer