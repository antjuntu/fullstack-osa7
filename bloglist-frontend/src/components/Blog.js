import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
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
      props.history.push('/')
      props.notify(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  const blogStyle = {
    marginTop: 10
  }

  if  (blog === undefined) {
    return null
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
      <h3>comments</h3>
      <ul>
        {blog.comments.map(b => <li key={b}>{b}</li>)}
      </ul>
    </div>
  )}


Blog.propTypes = {
  blog: PropTypes.object
}


const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}
const connectedBlog = connect(
  mapStateToProps,
  {
    likeBlog,
    removeBlog,
    notify
  }
)(Blog)

export default withRouter(connectedBlog)