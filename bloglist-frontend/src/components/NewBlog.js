import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

import { createBlog } from '../reducers/blogReducer'
import { toggleVisibility } from '../reducers/togglableReducer'
import { notify } from '../reducers/notificationReducer'

const NewBlog = (props) => {
  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const handleSubmit = (event) => {
    event.preventDefault()
    const blog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    props.createBlog(blog)
    props.toggleVisibility()
    props.notify(`a new blog ${blog.title} by ${blog.author} added`)
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>create new</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>title</label>
          <input {...title} id='title' />
        </Form.Field>
        <Form.Field>
          <label>author</label>
          <input {...author} id='author' />
        </Form.Field>
        <Form.Field>
          <label>url</label>
          <input {...url} id='url' />
        </Form.Field>
        <Button basic color='grey' type='submit'>create</Button>
      </Form>
    </div>
  )
}

export default connect(
  null,
  {
    createBlog,
    toggleVisibility,
    notify
  }
)(NewBlog)