import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import togglableReducer from './reducers/togglableReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogReducer,
  visible: togglableReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store