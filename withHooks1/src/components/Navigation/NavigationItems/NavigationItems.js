import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'

import styles from './NavigationItems.module.css'

const navigationItems = ({ isAuthenticated }) => (
  <ul className={ styles.NavigationItems }>
    <NavigationItem exact link='/'> Burger </NavigationItem>
    { 
      isAuthenticated
        ? (
          <>
            <NavigationItem link='/orders'> Orders </NavigationItem>
            <NavigationItem link='/logout'> Logout </NavigationItem>
          </>
        )
        : <NavigationItem link='/auth'> Login </NavigationItem>
    }
  </ul>
)

export default navigationItems