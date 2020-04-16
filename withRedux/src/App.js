import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import * as actionCreators from './store/actions/index'

const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'))
const asyncOrders = asyncComponent(() => import('./containers/Orders/Orders'))
const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'))

class App extends Component {

  componentDidMount() {
    this.props.onAuthCheckState()
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={ BurgerBuilder } />
            <Route path='/auth' component={ asyncAuth } />
            {
              this.props.isAuthenticated
                ? (
                  <>
                  <Route path='/checkout' component={ asyncCheckout } />
                  <Route path='/orders' component={ asyncOrders } />
                  <Route path='/logout' component={ Logout } />
                  </>
                )
                : null
            }
            <Redirect to='/' />
          </Switch>
        </Layout>
      </div>
    );
  }
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
