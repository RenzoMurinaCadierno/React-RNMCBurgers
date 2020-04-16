import React from 'react'

import EmptyWrapper from '../EmptyWrapper/EmptyWrapper'
import Modal from '../../components/UI/Modal/Modal'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {

  return props => {

    const [error, handleClearError] = useHttpErrorHandler(axios)
    
    return (
      <EmptyWrapper>
        <Modal show={ error } cancelModal={ handleClearError }>
          { error ? error.message : null }
        </Modal>
        <WrappedComponent { ...props } />
      </EmptyWrapper>
    )
  }
}

export default withErrorHandler