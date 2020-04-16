import React from 'react'

import styles from './BuildControl.module.css'

const buildControl = ({ 
  label, handleAddIngredient, handleRemoveIngredient, disabled
}) => (
  <div className={ styles.BuildControl }>
    <div className={ styles.Label }> { label } </div>
    <button 
      className={ styles.Less }
      onClick={ handleRemoveIngredient }
      disabled={ disabled }
    > 
      - 
    </button>
    <button 
      className={ styles.More } 
      onClick={ handleAddIngredient }
    > 
      + 
    </button>
  </div>
)

export default buildControl