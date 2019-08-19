import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'

const Blog = (props) => {
  const [comment, setComment] = useState('')

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

  const addComment = () => {
    // Reload page so that a new comment is visible immediately
    //event.preventDefault()
    //console.log('add comment', blog.id, comment)
    props.commentBlog(blog.id, comment)
    setComment('')
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
      <form onSubmit={addComment}>
        <input value={comment} onChange={(event) => setComment(event.target.value)} />
        <button type='submit'>add comment</button>
      </form>
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
    commentBlog,
    notify
  }
)(Blog)

export default withRouter(connectedBlog)