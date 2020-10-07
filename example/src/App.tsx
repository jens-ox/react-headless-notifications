import React from 'react'

import { NotificationProvider } from 'react-headless-notifications'
import ContainerComponent from './components/ContainerComponent'
import ExampleComponent from './components/ExampleComponent'
import NotificationComponent from './components/NotificationComponent'



const App = () => {
  return <NotificationProvider
    containerComponent={ContainerComponent}
    notificationComponent={NotificationComponent}
    autoDismiss={true}
    autoDismissTimeout={1000}
  >
    <ExampleComponent />
  </NotificationProvider>
}

export default App
