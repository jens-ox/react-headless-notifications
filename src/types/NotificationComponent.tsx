import { ReactNode } from 'react'
import NotificationType from './NotificationType'
import TransitionState from './TransitionState'

interface NotificationComponentProps {
  onDismiss?: () => void
  children?: ReactNode
  type?: NotificationType
  transitionState: TransitionState
  transitionDuration?: number
}

export default NotificationComponentProps
