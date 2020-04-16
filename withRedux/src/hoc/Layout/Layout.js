import React, { Component } from 'react'
import { connect } from 'react-redux'

import EmptyWrapper from '../EmptyWrapper/EmptyWrapper'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import styles from './Layout.module.css'

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  handleCloseSideDrawer = () => {
    this.setState({ showSideDrawer: false })
  }

  handleToggleSideDrawer = () => {
    this.setState( prevState => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    const { children, isAuthenticated } = this.props
    const { showSideDrawer } = this.state

    return (
      <EmptyWrapper>
        <Toolbar 
          isAuthenticated={ isAuthenticated }
          toggleSideDrawer={ this.handleToggleSideDrawer }/>
        <SideDrawer
          isAuthenticated={ isAuthenticated }
          openBackDrop={ showSideDrawer }  
          onBackDropClick={ this.handleCloseSideDrawer }
        />
        <main className={ styles.Content }>
          { children }
        </main>
      </EmptyWrapper>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

export default connect(mapStateToProps)(Layout)