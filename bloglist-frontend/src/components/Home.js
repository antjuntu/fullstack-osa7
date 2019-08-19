import React from 'react'
import { connect } from 'react-redux'
import Togglable from './Togglable'
import Blog from './Blog'
import NewBlog from './NewBlog'

const Home = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <Togglable buttonLabel='create'>
        <NewBlog />
      </Togglable>

      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps
)(Home)