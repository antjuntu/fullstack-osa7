import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import { useField } from './hooks'
import { notify } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { toggleVisibility } from './reducers/togglableReducer'
import { setUser } from './reducers/loginReducer'
import Home from './components/Home'
import Users from './components/Users'

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

  if (props.loggedUser === null) {
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
    <Router>
      <div>
        <h2>blogs</h2>

        <Notification />

        <p>{props.loggedUser.name} logged in</p>
        <button onClick={handleLogout}>logout</button>

        <Route exact path='/'
          render={() => <Home />}
        />
        <Route exact path='/users'
          render={() => <Users />}
        />
      </div>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    loggedUser: state.loggedUser
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