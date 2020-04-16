import React from 'react'

import styles from './Menu.module.css'

const menu = ({ toggleSideDrawer }) => (
  <div className={ styles.Menu } onClick={ toggleSideDrawer }>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default menu