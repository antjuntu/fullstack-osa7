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
        <NewBlog handleBlogCreate={props.handleBlogCreate} />
      </Togglable>

      {props.blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          like={props.handleBlogLike}
          remove={props.handleBlogRemove}
          user={props.user}
          creator={blog.user.username === props.user.username}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps
)(Home)