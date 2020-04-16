import React from 'react'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

import styles from './CheckoutSummary.module.css'

const checkoutSummary = ({ 
  ingredients, checkoutCancel, checkoutSuccess 
}) => {
  return (
    <div className={ styles.CheckoutSummary }>
      <h1> Congrats on your burger! Take it with you! </h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={ ingredients }/>
      </div>
      <Button 
        btnType='Danger' customButtonClick={ checkoutCancel }
      > 
        Cancel 
      </Button>
      <Button 
        btnType='Success' customButtonClick={ checkoutSuccess }
      > 
        Purchase 
      </Button>
    </div>
  )
}

export default checkoutSummary