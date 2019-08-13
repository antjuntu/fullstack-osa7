import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import togglableReducer from './reducers/togglableReducer'
import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  visible: togglableReducer,
  user: loginReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store