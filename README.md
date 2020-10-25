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

## Documentation

If you use TypeScript, you can probably use this for most use-cases without looking at the documentation - TypeScript will yell at you if something is missing.

### `NotificationProvider`

This component creates the necessary context for your components and views to call the provided hooks.

The following props can be set:

* `transitionDuration` (default `200`): if you want your notifications to be animated, you can customize the duration of the transitions.
* `autoDismiss` (default `true`): whether or not to remove notifications after a set amount of time.
* `autoDismissTimeout` (default `5000`): if `autoDismiss` is set to `true`, this is the duration until a notifications disappears again.
* `containerComponent`: the container which will contain the actual notifications. Typically, this will just be a `div` with fixed positioning in the top-right corner of the viewport.
* `notificationComponent`: the actual notification component (e.g. a wrapper around snackbar from material-ui). Your `NotificationComponent` will get passed the following props:
  * `onDismiss`: if your component calls this function, the notification will be dismissed. A typical use-case would be a close icon.
  * `type`: this library supports the default notification types (`info`, `warning`, `error`, `success`, will default to `info`). You can use this for example to set a custom color depending on the notification type.
  * `transitionState`: If you want, you can animate your notifications by applying custom styles depending on the transition state (which is `entering`, `entered`, `exiting`, or `exited`).
  * `transitionDuration`: either the default transition duration or your custom one set on the `NotificationProvider`.

### `useNotifications`

This hook is how notifications are rendered. It returns the following object:

```js
const {
  addNotification,
  removeNotification,
  removeAllNotifications,
  notificationStack
} = useNotifications()
```

For most use-cases, you only need `addNotification`.

* `const id = addNotification(notification, options)`: add a notification.
  * `notification`: either a simple string message or a React component.
  * `options`: options, can be left out.
    * `type`: type of notification.
    * `transitionDuration`: custom duration transition.
  * returns an `id`, if you want to programmatically remove it later.

  Example:
  ```jsx
  <Button onClick={() => addNotification('this is an error', { type: 'error' })}>click me</Button>
  ```
* `removeNotification(id)`: removes the notification with the given `id`.
* `removeAllNotifications()`: removes all notifications.
* `notificationStack`: Array of currently active notifications.

## License

MIT © [jens-ox](https://github.com/jens-ox)
