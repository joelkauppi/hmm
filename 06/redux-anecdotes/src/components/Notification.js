import React from 'react'
import { useSelector, connect } from 'react-redux'


const Notification = (props) => {
  const notificationToShow = () => {
    return {
      message: props.notification.message,
      visible: props.notification.visible
    }
  }

  const styleShow = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const styleHide = {
    display: 'hidden'
  }
  return (
    <div style={notificationToShow().visible ? styleShow : styleHide}>
      {notificationToShow().message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification  
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
