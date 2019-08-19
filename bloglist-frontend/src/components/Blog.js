import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blog = (props) => {
  const blog = props.blog

  const like = (blog) => {
    props.likeBlog(blog)
    props.notify(`blog ${blog.title} by ${blog.author} liked!`)
  }

  const remove = (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      props.notify(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const creator = blog.user.username === props.loggedUser.username

  return (
    <div style={blogStyle}>
      <h2 className='name'>
        {blog.title} {blog.author}
      </h2>
      <div className='details'>
        <a href={blog.url}>{blog.url}</a>
        <div>{blog.likes} likes
          <button onClick={() => like(blog)}>like</button>
        </div>
        <div>added by {blog.user.name}</div>
        {creator &&(<button onClick={() => remove(blog)}>remove </button>)}
      </div>
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}
export default connect(
  mapStateToProps,
  {
    likeBlog,
    removeBlog,
    notify
  }
)(Blog)