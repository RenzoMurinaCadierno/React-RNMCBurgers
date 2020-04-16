import React from 'react'

import EmptyWrapper from '../../../hoc/EmptyWrapper/EmptyWrapper'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

import styles from './SideDrawer.module.css'

const sideDrawer = ({ openBackDrop, onBackDropClick, isAuthenticated }) => {

  let assignedClasses = [styles.SideDrawer, styles.Close]

  if (openBackDrop) {
    assignedClasses[1] = styles.Open
  }

  return (
    <EmptyWrapper>
      <Backdrop show={ openBackDrop } onBackDropClick={ onBackDropClick } />
      <div 
        className={ assignedClasses.join(' ') }
        onClick={ onBackDropClick }
      >
        {/* <Logo height='11%'/> */}
        <div className={ styles.Logo }>
          <Logo/> 
        </div>
        <nav>
          <NavigationItems isAuthenticated={ isAuthenticated }/>
        </nav>
      </div>
    </EmptyWrapper>
  )
}

export default sideDrawer