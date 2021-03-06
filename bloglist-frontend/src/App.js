import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { Form, Button, Menu } from 'semantic-ui-react'

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
import User from './components/User'
import Blog from './components/Blog'

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
      props.notify('wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    props.setUser(null)
    blogService.destroyToken()
    window.localStorage.removeItem('loggedBlogAppUser')
  }

  const getBlogById = (id) => {
    const blog = props.blogs.find(b => b.id === id)
    return blog
  }

  if (props.loggedUser === null) {
    return (
      <Container>
        <h2>log in to application</h2>

        <Notification />

        <Form onSubmit={handleLogin}>
          <Form.Field>
            <label>username</label>
            <input {...username} id='username' />
          </Form.Field>
          <Form.Field>
            <label>password</label>
            <input {...password} id='password' />
          </Form.Field>
          <Button type="submit">login</Button>
        </Form>
      </Container>
    )
  }

  return (
    <Container>
      <Router>
        <div>
          <Menu inverted>
            <Menu.Item link>
              <Link to='/'>blogs</Link>
            </Menu.Item>
            <Menu.Item link>
              <Link to='/users'>users</Link>
            </Menu.Item>
            <Menu.Item>
              {props.loggedUser.name} logged in
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>
              logout
            </Menu.Item>
          </Menu>

          <h1>Blog App</h1>

          <Notification />

          <Route exact path='/'
            render={() => <Home />}
          />
          <Route exact path='/users'
            render={() => <Users />}
          />
          <Route exact path='/users/:id'
            render={({ match }) => <User id={match.params.id} />}
          />
          <Route path='/blogs/:id'
            render={({ match }) => <Blog blog={getBlogById(match.params.id)} />}
          />
        </div>
      </Router>
    </Container>
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