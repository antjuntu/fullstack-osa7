import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Form, Button, List } from 'semantic-ui-react'

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

  const addComment = (event) => {
    event.preventDefault()
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
          <Button basic color='grey' onClick={() => like(blog)}>like</Button>
        </div>
        <div>added by {blog.user.name}</div>
        {creator &&(<Button basic color='grey' onClick={() => remove(blog)}>remove </Button>)}
      </div>
      <h3>comments</h3>
      <Form onSubmit={addComment}>
        <Form.Field>
          <input value={comment} onChange={(event) => setComment(event.target.value)} />
          <Button basic color='grey' type='submit'>add comment</Button>
        </Form.Field>
      </Form>
      <List bulleted>
        {blog.comments.map(c =>
          <List.Item key={c}>{c}</List.Item>
        )}
      </List>
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