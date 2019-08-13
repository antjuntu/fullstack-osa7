import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import Blog from './Blog'
import NewBlog from './NewBlog'
import { createBlog, likeBlog, removeBlog } from '../reducers/blogReducer'
import { toggleVisibility } from '../reducers/togglableReducer'
import { notify } from '../reducers/notificationReducer'

const Home = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const handleBlogCreate = (blog) => {
    props.createBlog(blog)
    props.toggleVisibility()
    props.notify(`a new blog ${blog.title} by ${blog.author} added`)
  }

  const handleBlogLike = (blog) => {
    props.likeBlog(blog)
    props.notify(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const handleBlogRemove = (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      props.notify(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  return (
    <div>
      <Togglable buttonLabel='create'>
        <NewBlog handleBlogCreate={handleBlogCreate} />
      </Togglable>

      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={handleBlogLike}
          remove={handleBlogRemove}
          loggedUser={props.loggedUser}
          creator={blog.user.username === props.loggedUser.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  {
    createBlog,
    likeBlog,
    removeBlog,
    toggleVisibility,
    notify
  }
)(Home)