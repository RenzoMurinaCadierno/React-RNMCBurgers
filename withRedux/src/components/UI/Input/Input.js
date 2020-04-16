import React from 'react'

import styles from './Input.module.css'

const input = ({ 
  elemType, label, elemConfig, value, change, invalid, 
  shouldValdiate, touched, ...otherProps
}) => {

  let inputElement = null
  let validationError = null
  const inputClasses = [styles.InputElement]

  if (invalid && shouldValdiate && touched)  {
    inputClasses.push(styles.Invalid)
    validationError = <p> Please enter a valid { elemConfig.placeholder }... </p>
  }

  switch (elemType) {
    case ('textarea'):
      inputElement = <textarea 
          className={ inputClasses.join(' ') } value={ value }
          onChange={ change } { ...elemConfig } { ...otherProps }
        />
      break
    case ('select'):
      inputElement = <select
          className={ inputClasses.join(' ') } 
          onChange={ change } value={ value }
        >
          { elemConfig.options.map(option => (
            <option key={ option.value } value={ option.value }>
              { option.displayValue }
            </option>
          )) }
        </select>
      break
    case ('input'):
    default:
      inputElement = <input 
        className={ inputClasses.join(' ') } 
        type={ elemType } value={ value } onChange={ change }
        { ...elemConfig } { ...otherProps }
      />
      break
  }

  return (
    <div className={ styles.Input }>
      <label className={ styles.Label }> { label } </label>
      { inputElement }
      { validationError }
    </div>
  )
}

export default input