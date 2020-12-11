import { fromJS } from 'immutable'
import * as constants from './constants'
import { Route } from 'react-router-dom'
import Index from '../../index'
import React from 'react'

const defaultState = fromJS({
  userBillType: [],
  breadcrumbList: ['app-title'],
  routers: [
    {
      routerDom: <Route key={'app'} exact path={'/app'} component={ (props) => <Index { ...props }/> } />,
      title: 'app-title',
      key: 'app',
      breadcrumbList: [],
      child: []
    }
  ]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.userBillType:
      return state.set('userBillType', action.data)
    case constants.routers:
      return state.set('routers', action.data)
    case constants.breadcrumbList:
      return state.set('breadcrumbList', action.data)
    default:
      return state
  }
}
