import React from 'react'
import { connect } from 'react-redux'
import { toggleVisibility } from '../reducers/togglableReducer'

const Togglable = (props) => {
  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={props.toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={props.toggleVisibility}>cancel</button>
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