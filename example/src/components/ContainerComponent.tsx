import React from 'react'
import { ContainerComponentProps } from 'react-headless-notifications'

const ContainerComponent = ({ children }: ContainerComponentProps) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      padding: '1rem',
      overflow: 'hidden'
    }}>{children}</div>
  )
}

export default ContainerComponent
