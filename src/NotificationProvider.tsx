import React, {
  ComponentType,
  createContext,
  ReactNode,
  Ref,
  useContext,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import NotificationController from './NotificationController'
import Notification, { Options } from './types/Notification'
import NotificationComponentProps from './types/NotificationComponent'
import TransitionState from './types/TransitionState'

type Id = string
type AddFn = (content?: Node | string, options?: Options) => Id | null
type UpdateFn = (id: Id, options: Options) => void
type RemoveFn = (id: Id) => void

interface Context {
  add: AddFn
  remove: RemoveFn
  removeAll: () => void
  update: UpdateFn
  notifications: Array<Notification>
}

const NotificationContext = createContext<Context>({
  add: () => '',
  remove: () => null,
  removeAll: () => null,
  update: () => null,
  notifications: []
})
const { Consumer, Provider } = NotificationContext

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

function generateUEID(): string {
  const first = ('000' + ((Math.random() * 46656) | 0).toString(36)).slice(-3)
  const second = ('000' + ((Math.random() * 46656) | 0).toString(36)).slice(-3)
  return first + second
}

interface NotificationProviderProps {
  autoDismissTimeout?: number
  autoDismiss?: boolean
  children?: ReactNode
  transitionDuration?: number
  containerComponent: ComponentType
  notificationComponent: ComponentType<NotificationComponentProps>
}

export const NotificationProvider = ({
  autoDismissTimeout = 5000,
  autoDismiss = true,
  children,
  containerComponent: ContainerComponent,
  notificationComponent: NotificationComponent,
  transitionDuration = 200
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Array<Notification>>([])

  const has = (id: Id): boolean => {
    if (!notifications.length) return false
    return Boolean(notifications.filter((t) => t.id === id).length)
  }

  const add = (
    content: Node | string = '',
    options: Options = {}
  ): Id | null => {
    const id = options.id || generateUEID()

    // bail if a notification exists with this ID
    if (has(id)) return null

    // update the notification stack
    setNotifications([...notifications, { content, id, ...options }])

    // consumer may want to do something with the generated ID (and not use the callback)
    return id
  }

  const remove = (id: Id): void => {
    // bail if NO notifications exists with this ID
    if (!has(id)) return

    setNotifications(notifications.filter((t) => t.id !== id))
  }

  const removeAll = (): void => {
    if (!notifications.length) return
    notifications.forEach((t) => remove(t.id))
  }

  const update = (id: Id, options: Options = {}): void => {
    // bail if NO notifications exists with this ID
    if (!has(id)) return

    // update the notifications stack
    const i = notifications.findIndex((t) => t.id === id)
    const updatedNotification = { ...notifications[i], ...options }
    setNotifications([
      ...notifications.slice(0, i),
      updatedNotification,
      ...notifications.slice(i + 1)
    ])
  }

  const onDismiss = (id: Id) => (): void => {
    console.log('removing: ', id)
    remove(id)
  }

  const portalTarget = canUseDOM ? document.body : null

  return (
    <Provider value={{ add, remove, removeAll, update, notifications }}>
      {children}

      {portalTarget ? (
        createPortal(
          <ContainerComponent>
            <TransitionGroup component={null}>
              {notifications.map(({ content, id, type }) => (
                <Transition
                  appear
                  key={id}
                  mountOnEnter
                  timeout={transitionDuration}
                  unmountOnExit
                >
                  {(transitionState: TransitionState) => (
                    <NotificationController
                      autoDismiss={autoDismiss}
                      autoDismissTimeout={autoDismissTimeout}
                      key={id}
                      onDismiss={onDismiss(id)}
                      transitionDuration={transitionDuration}
                      transitionState={transitionState}
                      component={NotificationComponent}
                      type={type}
                    >
                      {content}
                    </NotificationController>
                  )}
                </Transition>
              ))}
            </TransitionGroup>
          </ContainerComponent>,
          portalTarget
        )
      ) : (
        <ContainerComponent /> // keep ReactDOM.hydrate happy
      )}
    </Provider>
  )
}

interface NotificationConsumerProps {
  children: (context: Context) => ReactNode
}
export const NotificationConsumer = ({
  children
}: NotificationConsumerProps) => (
  <Consumer>{(context) => children(context)}</Consumer>
)

export const withNotificationsManager = (Comp: ComponentType<any>) =>
  React.forwardRef((props: any, ref: Ref<any>) => (
    <NotificationConsumer>
      {(context) => <Comp notificationManager={context} {...props} ref={ref} />}
    </NotificationConsumer>
  ))

export const useNotifications = () => {
  const ctx = useContext(NotificationContext)

  if (!ctx) {
    throw Error(
      'The `useNotifications` hook must be called from a descendent of the `NotificationProvider`.'
    )
  }

  return {
    addNotification: ctx.add,
    removeNotification: ctx.remove,
    removeAllNotifications: ctx.removeAll,
    updateNotification: ctx.update,
    notificationStack: ctx.notifications
  }
}
