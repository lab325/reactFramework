import React, { Component } from 'react'
import { Menu } from 'antd'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'

// import { getUserName } from '../../publicFunction'
import history from './history'
import { actionCreators as commonAction } from './store'

const { SubMenu } = Menu

class SideMenu extends Component {
  state = {
    current: 'mail'
  };

  componentDidMount() {
    this.getMenu()
  }

  handleClick = (link, myTitle, fatherTitle = '') => {
    if (link.length !== 0) {
      history.push(link)
    }
    const breadcrumbs = []
    if (fatherTitle !== '') {
      breadcrumbs.push(fatherTitle)
    }
    breadcrumbs.push(myTitle)
    this.props.dispatchBreadcrumbList(breadcrumbs)
  }

  getMenu = () => {
    const { routers } = this.props
    const menu = []
    for (const i of routers) {
      if (i.child.length !== 0) {
        menu.push(
          <SubMenu key={i.key} title={i.title}>
            { i.child.map(item => <Menu.Item key={item.key} onClick={() => this.handleClick(item.link, item.title, i.title)}>{item.title}</Menu.Item>) }
          </SubMenu>
        )
      } else {
        menu.push(
          <Menu.Item key={i.key} title={i.title} onClick={() => this.handleClick(i.link, i.title)}>{i.title}</Menu.Item>
        )
      }
    }
    return menu
  };

  render() {
    return (
      <Menu
        mode='inline'
        style={{ height: 'calc(100% - 3rem)', marginTop: '3rem' }}
      >
        { this.getMenu() }
      </Menu>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    routers: state.get('commonReducer').get('routers').toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchBreadcrumbList(data) {
      dispatch(commonAction.dispatchBreadcrumbList(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)
