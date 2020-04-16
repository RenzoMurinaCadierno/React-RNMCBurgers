import React, { Component } from 'react'

import EmptyWrapper from '../../../hoc/EmptyWrapper/EmptyWrapper'
import Backdrop from '../Backdrop/Backdrop'

import styles from './Modal.module.css'

class Modal extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show
      || nextProps.children !== this.props.children
  }

  render() {
    const { children, show, cancelModal } = this.props
  
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
}

export default Modal