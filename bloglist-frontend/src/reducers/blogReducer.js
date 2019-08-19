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

export const createBlog = blog => {
  return async dispatch => {
    let newBlog = await blogService.create(blog)
    // We need populated user object
    newBlog = await blogService.get(newBlog.id)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const commentBlog = (id, content) => {
  return async dispatch => {
    await blogService.addComment(id, content)
    dispatch({
      type: 'COMMENT_BLOG',
      id,
      content
    })
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(likedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
}

const blogReducer = (state = [], action) => {
  //console.log('ACTION:', action)
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'LIKE_BLOG':
    return state.map(blog => blog.id === action.data.id ? action.data : blog)
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.data.id)
  case 'COMMENT_BLOG':
  {
    const blogToComment = state.find(b => b.id === action.id)
    const commentedBlog = { ...blogToComment, comments: blogToComment.comments.concat(action.content) }
    return state.filter(blog => blog.id !== action.id ? blog : commentedBlog)
  }
  default:
    return state
  }
}

export default blogReducer