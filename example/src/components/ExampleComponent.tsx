import React from 'react'
import { useNotifications } from 'react-headless-notifications'

const ExampleComponent = () => {
  const { addNotification } = useNotifications()
  return (
    <>
      <button onClick={() => addNotification('this is a default notification')}>default</button>
      <button onClick={() => addNotification('this is a error notification', { type: 'error'})}>error</button>
    </>
  )
}

export default ExampleComponent
