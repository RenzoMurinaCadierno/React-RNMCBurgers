import React from 'react'

import styles from './Backdrop.module.css'

const backdrop = ({ show, onBackDropClick }) => (
  show 
  ? <div className={ styles.Backdrop } onClick={ onBackDropClick }></div> 
  : null
)

export default backdrop