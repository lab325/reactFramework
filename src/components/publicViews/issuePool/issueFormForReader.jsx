import React, { Component } from "react";
import {message, PageHeader, Spin} from 'antd';

import IssueFormOfReading from "../../../forms/publicForm/issueForm/issueFormOfReading";
import ApprovedFormOfReading from "../../../forms/publicForm/approvedForm/approvedFormOfReading";

import WeldingModificationFormOfReading from "../../../forms/welding/modificationFormOfReading";
import GluingModificationFormOfReading from "../../../forms/gluing/modificationFormOfReading";

import ArtificialIssueFormForReader from "../../../forms/publicForm/artificialIssueForm/forReader";

import {Model} from "../../../dataModule/testBone";
import { issueFormUrl } from "../../../dataModule/UrlList";
import history from "../../common/history";

import "./style.less"

const model = new Model();

export default class IssueFormForReader extends Component{
  constructor(props) {
    super(props);
    this.state = {
      issueType: '',
      modificationForm: null,
      issueForm: null,
      approvedForm: null
    }
  }

  componentDidMount() {
    const locationParams = this.props.location.pathname.split('/');
    const issueId = locationParams[locationParams.length - 1];
    const issueType = locationParams[locationParams.length - 2];
    this.setState({ issueType: issueType })
    this.queryIssueFormDetail(issueId)
  }

  queryIssueFormDetail = (issueId) => {
    const me = this;
    model.fetch({}, 'approvingForm.json', 'get', function (response) {
      me.setState({ approvedForm: response.data })
    });
    model.fetch(
      {_id: issueId},
      issueFormUrl,
      'get',
      function (response) {
        me.setState({ issueForm: response.data.results[0] })
        // me.setState({ issueForm: response.data[0] })
      },
      function(response) {
        message.warning('加载失败，请重试')
      },
      false
    );
    // gluingJson/gluingModification.json
    // weldingJson/weldingModificationForm.json
    model.fetch({}, 'gluingJson/gluingModification.json', 'get', function (response) {
      me.setState({ modificationForm: response.data })
    })
  };

  renderIssueForm = () => {
    const { issueForm, approvedForm } = this.state;

    if (issueForm !== null && approvedForm !== null) {
      const domList = [];
      domList.push(<IssueFormOfReading key={"IssueFormOfReading"} issue_form={issueForm}/>);
      domList.push('');
      domList.push(<ApprovedFormOfReading key={"ApprovedFormOfReading"} approvingForm={approvedForm} />);
      switch (this.state.issueType) {
        case '焊接非人为问题':
          domList[1] = <
            WeldingModificationFormOfReading
            key={"ModificationFormOfReading"}
            issueForm={issueForm}
          />
          break;
        case '涂胶非人为问题':
          domList[1] = <GluingModificationFormOfReading key={"GluingModificationFormOfReading"} />
          break;
        default:
          domList[1] = <ArtificialIssueFormForReader key={"ArtificialIssueFormForReader"} issueForm={issueForm}/>
          break;
      }
      return domList
    } else {
      return <div className={"loadingStyle"}><Spin size="small" /><Spin /><Spin size="large" /></div>
    }
  };

  render() {
    return (
      <div className={"IssueFormForReader"}>
        <PageHeader
          className={"pageHeader"}
          onBack={() => history.goBack()}
          title={ this.state.issueType + "整改详情" }
          // subTitle="This is a subtitle"
        />
        <div className={"tablesStyle"}>
          {this.renderIssueForm()}
        </div>
      </div>
    );
  }
}
