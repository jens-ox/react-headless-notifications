import React from 'react'
import { NotificationComponentProps } from 'react-headless-notifications'


export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

const notificationStates = {
  entering: { transform: 'translate3d(120%, 0, 0)' },
  entered: { transform: 'translate3d(0,0,0)' },
  exiting: { transform: 'scale(0.66)', opacity: 0 },
  exited: { transform: 'scale(0.66)', opacity: 0 },
}

const NotificationComponent = ({ children, onDismiss, type = 'info', transitionState, transitionDuration = 200 }: NotificationComponentProps) => (
  <div style={{
    transition: `transform ${transitionDuration}ms cubic-bezier(0.2, 0, 0, 1), opacity ${transitionDuration}ms`,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: '.5rem',
    marginBottom: '1rem',
    ...notificationStates[transitionState]
  }}>
    {children}
    <br/>
    <span>type: {type}</span>
    <button onClick={onDismiss}>close</button>
  </div>
)

export default NotificationComponent
