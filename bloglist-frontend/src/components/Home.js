import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from './Togglable'
import NewBlog from './NewBlog'

const Home = (props) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <Togglable buttonLabel='create'>
        <NewBlog />
      </Togglable>
      <br />
      {props.blogs.sort(byLikes).map(blog =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} <i>by</i> {blog.author}
          </Link>
        </div>
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