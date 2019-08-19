import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { toggleVisibility } from '../reducers/togglableReducer'

const Togglable = (props) => {
  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button basic color='grey' onClick={props.toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button basic onClick={props.toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    visible: state.visible
  }
}

export default connect(
  mapStateToProps,
  {
    toggleVisibility
  }
)(Togglable)