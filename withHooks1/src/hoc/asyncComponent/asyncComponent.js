import React, { Component } from 'react'

const asyncComponent = componentImportStatement => {
  
  return class extends Component {
    
    state = { component: null }

    componentDidMount() {
      componentImportStatement()
        .then(impCmp => {
          this.setState({ component: impCmp.default })
        })
    }

    render() {
      const ImportedComponent = this.state.component
      return (
        ImportedComponent
          ? <ImportedComponent { ...this.props } />
          : null
      )
    }
  }
}

export default asyncComponent