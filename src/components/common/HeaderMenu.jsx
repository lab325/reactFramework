import React, {Component} from "react";
import { Menu } from 'antd';
import { Link } from "react-router-dom";

import { getUserName } from '../../publicFunction';
import history from './history';

const { SubMenu } = Menu;

export default class HeaderMenu extends Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu
        style={{width: '125%', marginLeft: '-12.5%', paddingLeft: '12.5%', position: 'fixed', zIndex: 999}}
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal">
        <SubMenu title="检验">
          <Menu.Item key="焊接检验">
            焊接检验
            {/*<Link to="/technology-system/check/welding">焊接检验</Link>*/}
          </Menu.Item>
          <Menu.Item key="涂胶检验">
            涂胶检验
            {/*<Link to="/technology-system/check/gluing">涂胶检验</Link>*/}
          </Menu.Item>
          <Menu.Item key="样架测量检验">
            样架测量检验
            {/*<Link to="/technology-system/check/sample-frame">样架测量检验</Link>*/}
          </Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
