import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { Layout, Breadcrumb } from 'antd'
import { getCookie, setCookie } from '../../helpers/cookies'
import store from '../../store'
import { Provider } from 'react-redux'
import { actionCreators as commonAction } from './store'
import { flattenArrays, getBreadFromLocation } from '../../publicFunction'

import SideMenu from './SideMenu'
import HeaderCustom from './HeaderCustom'
// import Index from '../index/index'
import noMatch from './404'

import '../../style/index.less'

const { Content, Footer, Sider } = Layout

class App extends Component {
  state = {
    collapsed: getCookie('mspa_SiderCollapsed') === 'true'
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    }, function() {
      setCookie('mspa_SiderCollapsed', this.state.collapsed)
    })
  };

  componentDidMount() {
    if (getCookie('mspa_SiderCollapsed') === null) {
      setCookie('mspa_SiderCollapsed', false)
    }
    commonAction.getAllBillTypes()
  }

  render() {
    const { collapsed } = this.state
    const { location } = this.props
    let name
    // if (!getCookie('mspa_user') || getCookie('mspa_user') === 'undefined') {
    //   return <Redirect to='/login' />
    // } else {
    //   name = JSON.parse(getCookie('mspa_user')).username
    // }

    let routers = store.getState().get('commonReducer').get('routers').toJS()
    routers = flattenArrays(routers, 'child')
    const breadcrumbList = getBreadFromLocation(routers, location.pathname)

    return (
      <Layout>
        <Provider store={store}>
          <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name} />

          <Content>
            {/* <HeaderMenu /> */}
            <Layout style={{ padding: '0 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <SideMenu />
              </Sider>
              <Content style={{ padding: '0 24px', minHeight: 'calc(100vh)' }}>
                <Breadcrumb style={{ margin: '4rem 0 0' }}>
                  { breadcrumbList.map(item => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>) }
                </Breadcrumb>
                <Switch>
                  {/* <Route exact path={'/app'} component={ (props) => <Index { ...props }/> } /> */}
                  { routers.map(item => item.routerDom) }
                  <Route component={noMatch} />
                </Switch>
              </Content>
            </Layout>
          </Content>

          <Footer style={{ textAlign: 'center', backgroundColor: '#778899', color: 'white', marginLeft: 200 }}>
            <span style={{ display: 'block' }}>公司地址：上海市杨浦区军工路516号上海理工大学</span>
            <span style={{ display: 'block' }}>联系电话：12345</span>
            <span style={{ display: 'block' }}>邮箱：12345@qq.com</span>
          </Footer>
        </Provider>
      </Layout>
    )
  }
}

export default withRouter(App)
