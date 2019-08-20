import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  if (notification.message === null) {
    return null
  }

  // const style = {
  //   color: notification.type === 'error' ? 'red' : 'green',
  //   background: 'lightgrey',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // }
  if (notification.type === 'error') {
    return (
      <Message error>
        {notification.message}
      </Message>
    )
  }

  return (
    <Message success>
      {notification.message}
    </Message>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)