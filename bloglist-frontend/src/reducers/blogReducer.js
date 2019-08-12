import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

const blogReducer = (state = [], action) => {
  console.log('ACTION:', action)
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export default blogReducer