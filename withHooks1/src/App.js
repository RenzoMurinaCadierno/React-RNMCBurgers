import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actionCreators from './store/actions/index'

const Auth = React.lazy(
  () => import('./containers/Auth/Auth')
)
const Orders = React.lazy(
  () => import('./containers/Orders/Orders')
)
const Checkout = React.lazy(
  () => import('./containers/Checkout/Checkout')
)

const App = props => {

  const { onAuthCheckState } = props

  useEffect(() => {
    onAuthCheckState()
  }, [onAuthCheckState])

  return (
    <div>
      <Layout>
        <Suspense fallback={ <p> Loading...</p> }>
          <Switch>
            <Route path='/' exact component={ BurgerBuilder } />
            <Route 
              path='/auth' render={ props => <Auth { ...props } /> } />
            {
              props.isAuthenticated
                ? (
                  <>
                  <Route 
                    path='/checkout' 
                    render={ props => <Checkout { ...props } /> } />
                  <Route 
                    path='/orders' 
                    render={ props => <Orders { ...props } /> } />
                  <Route path='/logout' component={ Logout } />
                  </>
                )
                : null
            }
            <Redirect to='/' />
          </Switch>
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckState: () => dispatch(
      actionCreators.authCheckState()
    )
  }
}

// withRouter is needed here to enforce the routing to all
// components properly, as this one is a top level component
export default withRouter(
  connect(
    mapStateToProps, mapDispatchToProps
  )(App)
)
