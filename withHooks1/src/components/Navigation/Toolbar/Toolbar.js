import React from 'react'

import Menu from '../Menu/Menu'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

import styles from './Toolbar.module.css'

const toolbar = ({ toggleSideDrawer, isAuthenticated }) => (
  <header className={ styles.Toolbar }>
    <Menu toggleSideDrawer={ toggleSideDrawer } />
    <div className={ styles.Logo }>
        <Logo/> 
    </div>
    <nav className={ styles.DesktopOnly }>
      <NavigationItems isAuthenticated={ isAuthenticated }/>
    </nav>
  </header>
)

export default toolbar