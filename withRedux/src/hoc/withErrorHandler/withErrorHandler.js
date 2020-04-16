import React, { Component } from 'react'

import EmptyWrapper from '../EmptyWrapper/EmptyWrapper'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {

  return class extends Component {

    state = { error: null }

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(request => {
        this.setState({ error: null })
        return request
      })

      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error })
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.response.eject(this.resInterceptor)
    }

    handleClearError = () => {
      this.setState({ error: null })
    }

    render() {

      const { error } = this.state
      
      return (
        <EmptyWrapper>
          <Modal 
            show={ error }
            cancelModal={ this.handleClearError }
          >
            { error ? error.message : null }
          </Modal>
          <WrappedComponent { ...this.props } />
        </EmptyWrapper>
      )
    }
  }
}

export default withErrorHandler