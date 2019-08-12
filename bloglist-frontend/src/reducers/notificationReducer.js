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

export const notify = (message, type) => {
  return dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      notification: {
        message,
        type
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_MESSAGE'
      })
    }, 5000)
  }
}

export default reducer