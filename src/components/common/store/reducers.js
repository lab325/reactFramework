import { fromJS } from 'immutable'
import * as constants from './constants'
import { Route } from 'react-router-dom'
import Index from '../../index'
import React from 'react'

const defaultState = fromJS({
  routersReady: false,
  userBillType: [],
  breadcrumbList: ['账单记录'],
  routers: [
    {
      routerDom: <Route key={'/app'} exact path={'/app'} component={ (props) => <Index { ...props }/> } />,
      link: '/app',
      title: '账单记录',
      key: 'app',
      child: []
    }, {
      routerDom: null,
      link: '',
      title: '信息管理',
      key: 'app2',
      child: [{
        routerDom: <Route key={'/app/type_management'} exact path={'/app/type_management'} component={ (props) => <Index { ...props }/> } />,
        link: '/app/type_management',
        title: '支出类型管理',
        key: '支出类型管理',
        child: []
      }]
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
