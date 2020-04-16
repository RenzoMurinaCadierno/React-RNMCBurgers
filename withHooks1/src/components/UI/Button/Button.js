import React from 'react'

import styles from './Button.module.css'

const button = ({ children, btnType, disabled, customButtonClick }) => (
  <button 
    className={ [styles.Button, styles[btnType]].join(' ') }
    disabled={ disabled }
    onClick={ customButtonClick } 
  > 
    { children } 
  </button>
)

export default button