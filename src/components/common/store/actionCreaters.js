// import { Model } from '../../../dataModule/testBone'
// import { billTypes } from '../../../dataModule/UrlList'
import * as constants from './constants'

import { Route } from 'react-router-dom'
import Index from '../../index'
import React from 'react'
import { fromJS } from 'immutable'

// const model = new Model()

const router = [
  {
    routerDom: <Route key={'/app'} exact path={'/app'} component={ (props) => <Index { ...props }/> } />,
    link: '/app',
    title: 'app-title',
    key: 'app',
    child: []
  }, {
    routerDom: null,
    link: '',
    title: 'app2-title',
    key: 'app2',
    child: [{
      routerDom: <Route key={'/app/app-child-test'} exact path={'/app/app-child-test'} component={ (props) => <Index { ...props }/> } />,
      link: '/app/app-child-test',
      title: 'app-child-test-title',
      key: 'app-child-test',
      child: []
    }]
  }
]

export const dispatchRouters = () => ({
  type: constants.routers,
  data: fromJS(router)
})

export const dispatchBreadcrumbList = (data) => ({
  type: constants.breadcrumbList,
  data: fromJS(data)
})

export const getAllBillTypes = () => {
  // model.fetch(
  //   { creater: 'c6825ed3afa9411694b62e61119544ed' },
  //   billTypes,
  //   'POST',
  //   function(response) {
  //     console.log(response)
  //   },
  //   // eslint-disable-next-line handle-callback-err
  //   function(error) {
  //     return
  //   },
  //   false
  // )
}

