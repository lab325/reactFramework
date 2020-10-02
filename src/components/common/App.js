import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { getCookie, setCookie } from "../../helpers/cookies";
import store from '../../store';
import { Provider } from 'react-redux';

import HeaderMenu from './HeaderMenu'
import HeaderCustom from './HeaderCustom';
import Index from '../index/index';
import noMatch from './404';

import CheckRecordsDetails from '../publicViews/checkViews/checkRecordsDetails';

import WeldingCheckView from '../../views/weldingViews/weldingCheckView';
import WeldingParamsView from '../../views/weldingViews/weldingParamsView';
import WeldingParamsDetailsView from '../../views/weldingViews/weldingParamsView/detailsView';

import GluingParamsView from '../../views/gluingViews/gluingParamsView';
import GluingCheckView from '../../views/gluingViews/gluingCheckView';
import GluingParamsDetailsView from '../../views/gluingViews/gluingParamsView/detailsView';

import SampleFrameCheck from '../../views/sampleFrameView/sampleFrameCheck';

import PutIssue from '../publicViews/putIssue';
import MyIssues from '../publicViews/issuePool/myIssues';
import OtherIssues from '../publicViews/issuePool/otherIssues';
import IssueFormForReader from '../publicViews/issuePool/issueFormForReader';

import FinishedTasks from '../publicViews/mytasks/finishedTasks';
import UnfinishedTasks from '../publicViews/mytasks/unfinishedTasks';
import IssueFormForRectifier from '../publicViews/mytasks/unfinishedTasks/issueFormForRectifier';
import IssueFormForReviewer from '../publicViews/mytasks/unfinishedTasks/issueFormForReviewer';

import ImportWeldingParams from '../publicViews/importData/weldingParams';

import '../../style/index.less';

const { Content, Footer } = Layout;

class App extends Component {
  state = {
    collapsed: getCookie("mspa_SiderCollapsed") === "true",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, function () {
      setCookie("mspa_SiderCollapsed", this.state.collapsed);
    });
  };

  componentDidMount() {
    if (getCookie("mspa_SiderCollapsed") === null) {
      setCookie("mspa_SiderCollapsed", false);
    }
  }

  render() {
    const { collapsed } = this.state;
    // const {location} = this.props;
    let name;
    if (!getCookie("mspa_user") || getCookie("mspa_user") === "undefined") {
      return <Redirect to="/login" />
    } else {
      name = JSON.parse(getCookie("mspa_user")).username;
    }

    return (
      <Layout className="ant-layout-has-sider">
        <Provider store={store}>
          <Layout style={{ minHeight: "calc(100vh)", overflowX: 'auto' }}>
            <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name} />
            <Content style={{ width: '80%', minWidth: 1080, margin: "3rem auto 0", backgroundColor: '#fff' }}>
              <HeaderMenu />
              <Switch>
                <Route exact path={'/technology-system'} component={Index} />

                <Route exact path={'/technology-system/check/detail/:type/:_id'} component={CheckRecordsDetails} />

                <Route exact path={'/technology-system/check/welding'} component={WeldingCheckView} />
                <Route exact path={'/technology-system/params/welding'} component={WeldingParamsView} />
                {/* 焊点 id 避免刷新时的页面报错 */}
                <Route path={'/technology-system/params/welding/detail/:_id'} exact component={WeldingParamsDetailsView} />

                <Route path={'/technology-system/params/gluing'} exact component={GluingParamsView} />
                <Route exact path={'/technology-system/check/gluing'} component={GluingCheckView} />
                <Route path={'/technology-system/params/gluing/detail/:_id'} exact component={GluingParamsDetailsView} />

                <Route exact path={'/technology-system/check/sample-frame'} component={SampleFrameCheck} />

                <Route exact path={'/technology-system/issue/put-issue'} component={PutIssue} />
                <Route exact path={'/technology-system/issue/my-issues/:id'} component={MyIssues} />
                <Route exact path={'/technology-system/issue/other-issues'} component={OtherIssues} />
                <Route exact path={'/technology-system/issue/issue-form-for-reader/:issue_type/:id'} component={IssueFormForReader} />
                <Route exact path={'/technology-system/issue/issue-form-for-reviewer/:issue_type/:id'} component={IssueFormForReviewer} />

                <Route exact path={'/technology-system/finished-tasks'} component={FinishedTasks} />
                <Route exact path={'/technology-system/unfinished-tasks'} component={UnfinishedTasks} />
                <Route exact path={'/technology-system/issue/issue-form-for-rectifier/:issue_type/:id'} component={IssueFormForRectifier} />

                <Route exact path={'/technology-system/import-data/welding'} component={ImportWeldingParams} />

                <Route component={noMatch} />
              </Switch>
            </Content>

            <Footer style={{ textAlign: 'center', backgroundColor: "#778899", color: "white" }}>
              <span style={{ display: "block" }}>公司地址：上海市杨浦区军工路516号上海理工大学</span>
              <span style={{ display: "block" }}>联系电话：12345</span>
              <span style={{ display: "block" }}>邮箱：12345@qq.com</span>
            </Footer>
          </Layout>
        </Provider>
      </Layout>
    )
  }
}

export default withRouter(App);
