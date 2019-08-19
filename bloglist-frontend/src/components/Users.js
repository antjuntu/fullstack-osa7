import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const Users = (props) => {
  useEffect(() => {
    props.initializeUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <h2>Users</h2>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user =>
            <Table.Row key={user.id}>
              <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
              <Table.Cell>{user.blogs.length}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps,
  {
    initializeUsers
  }
)(Users)