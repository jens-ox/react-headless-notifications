# react-headless-notifications

> Bring-your-own-UI react notification system

[![NPM](https://img.shields.io/npm/v/react-headless-notifications.svg)](https://www.npmjs.com/package/react-headless-notifications) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-headless-notifications
```

## Usage

In your `App.tsx`:
```tsx
import React from 'react'

import { NotificationProvider } from 'react-headless-notifications'

const App = () => {
  return (
    <NotificationProvider>
      <MyStuff />
    </NotificationProvider>
  )
}

export default App
```

In your `MyStuff.tsx`:
```tsx
import React from 'react'
import { useNotifications } from 'react-headless-notifications'

const MyStuff = () => {
  const { addNotification } = useNotifications()
  return (
    <>
      <button onClick={() => addNotification('this is an error', { type: 'error'})}>Show error</button>
    </>
  )
}

export default MyStuff
```

For a full running CRA example, see the `example` directory.

## License

MIT © [jens-ox](https://github.com/jens-ox)
