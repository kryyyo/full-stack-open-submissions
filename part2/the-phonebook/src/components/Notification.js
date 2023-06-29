const Notification = ({ message, severity }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification' style={severity === 'error' ? { color: 'red' } : { color: 'green' }}>
      {message}
    </div>
  )
}

export default Notification;