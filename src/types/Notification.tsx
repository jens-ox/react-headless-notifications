import NotificationType from './NotificationType'
import TransitionState from './TransitionState'

export interface Options {
  id?: string
  type?: NotificationType
  transitionDuration?: number
  transitionState?: TransitionState
}

export default interface Notification extends Options {
  id: string
  content: Node
  options?: Options
}
