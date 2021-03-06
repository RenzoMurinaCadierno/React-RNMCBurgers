import React, { useState } from 'react'
import { connect } from 'react-redux'

import EmptyWrapper from '../EmptyWrapper/EmptyWrapper'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import styles from './Layout.module.css'

const Layout = ({ children, isAuthenticated }) => {

  const [showSideDrawer, setShowSideDrawer] = useState(false)

  const handleCloseSideDrawer = () => {
    setShowSideDrawer(false)
  }

  const handleToggleSideDrawer = () => {
    setShowSideDrawer(!showSideDrawer)
  }

  return (
    <EmptyWrapper>
      <Toolbar 
        isAuthenticated={ isAuthenticated }
        toggleSideDrawer={ handleToggleSideDrawer }/>
      <SideDrawer
        isAuthenticated={ isAuthenticated }
        openBackDrop={ showSideDrawer }  
        onBackDropClick={ handleCloseSideDrawer }
      />
      <main className={ styles.Content }>
        { children }
      </main>
    </EmptyWrapper>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

export default connect(mapStateToProps)(Layout)