import React from 'react'

import EmptyWrapper from '../../../hoc/EmptyWrapper/EmptyWrapper'
import Backdrop from '../Backdrop/Backdrop'

import styles from './Modal.module.css'

const Modal = props => {

  const { children, show, cancelModal } = props

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== this.props.show
  //     || nextProps.children !== this.props.children
  // }

  return (
    <EmptyWrapper>
      <Backdrop show={ show } onBackDropClick={ cancelModal } />
      <div 
        className={ styles.Modal }
        style={{ 
          transform: show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: show ? '1' : '0' 
        }}
      > 
        { children } 
      </div>
    </EmptyWrapper>
  )
}

export default React.memo(
  Modal, 
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
)