import React, { ComponentType, ReactNode } from 'react'
import NotificationType from './types/NotificationType'
import NotificationComponentProps from './types/NotificationComponent'
import TransitionState from './types/TransitionState'
import useTimeout from './useTimeout'

interface NotificationControllerProps {
  autoDismiss: boolean
  autoDismissTimeout: number
  onDismiss: () => void
  component: ComponentType<NotificationComponentProps>
  type?: NotificationType
  children?: ReactNode
  transitionDuration?: number
  transitionState: TransitionState
}

const NotificationController = ({
  autoDismiss,
  autoDismissTimeout,
  onDismiss,
  component: Notification,
  children,
  ...notificationProps
}: NotificationControllerProps) => {
  useTimeout(autoDismiss ? onDismiss : () => null, autoDismissTimeout)

  return (
    <Notification onDismiss={onDismiss} {...notificationProps}>
      {children}
    </Notification>
  )
}

export default NotificationController
