import React from 'react'
import { connect } from 'react-redux'
import { List } from 'semantic-ui-react'

const User = (props) => {
  if (props.user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{props.user.name}</h2>

      <h3>added blogs</h3>

      <List bulleted>
        {props.user.blogs.map(b =>
          <List.Item key={b.id}>{b.title}</List.Item>
        )}
      </List>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.find(u => u.id === ownProps.id)
  }
}

export default connect(
  mapStateToProps
)(User)