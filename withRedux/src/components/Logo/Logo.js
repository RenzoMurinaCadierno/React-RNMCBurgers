import React from 'react'

import burgerLogo from '../../assets/logo.png'

import styles from './Logo.module.css'

const logo = ({ height }) => (
  <div className={ styles.Logo } style={{ height }}>
    <img src={ burgerLogo } alt="Burger Logo"></img>
  </div>
)

export default logo