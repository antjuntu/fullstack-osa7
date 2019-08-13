import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useField } from './hooks'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { toggleVisibility } from './reducers/togglableReducer'
import { setUser } from './reducers/userReducer'

const App = (props) => {
  const [username] = useField('text')
  const [password] = useField('password')

  useEffect(() => {
    props.initializeBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
      blogService.setToken(user.token)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      props.setUser(user)
    } catch (exception) {
      props.notify('wrong username of password', 'error')
    }
  }

  const handleLogout = () => {
    props.setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  // TODO: move down
  const handleBlogCreate = (blog) => {
    props.createBlog(blog)
    props.toggleVisibility()
    props.notify(`a new blog ${blog.title} by ${blog.author} added`)
  }

  // TODO: move down
  const handleBlogLike = (blog) => {
    props.likeBlog(blog)
    props.notify(`blog ${blog.title} by ${blog.author} liked!`)
  }

  // TODO: move down
  const handleBlogRemove = (blog) => {
    const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
    if (ok) {
      props.removeBlog(blog)
      props.notify(`blog ${blog.title} by ${blog.author} removed!`)
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  if (props.user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...username}/>
          </div>
          <div>
            password
            <input {...password} />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>{props.user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>

      <Togglable buttonLabel='create'>
        <NewBlog handleBlogCreate={handleBlogCreate} />
      </Togglable>

      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={handleBlogLike}
          remove={handleBlogRemove}
          user={props.user}
          creator={blog.user.username === props.user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  {
    notify,
    initializeBlogs,
    createBlog,
    likeBlog,
    removeBlog,
    toggleVisibility,
    setUser
  }
)(App)