import React, { Component } from "react";
import {Button, message, Modal, PageHeader, Spin} from "antd";

import "../style.less";
import "../../issuePool/style.less";

import history from "../../../common/history";
import {Model} from "../../../../dataModule/testBone";
import {issueFormUrl} from "../../../../dataModule/UrlList";

import IssueFormOfReading from "../../../../forms/publicForm/issueForm/issueFormOfReading";
import WeldingModificationOfReading from "../../../../forms/welding/modificationFormOfReading";
import ArtificialIssueFormForReader from "../../../../forms/publicForm/artificialIssueForm/forReader";
import ApprovedFormOfEditing from "../../../../forms/publicForm/approvedForm/approvedFormOfEditing";

const model = new Model();

export default class IssueFormForReviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rectificationForm: null,
      currentUsingParam: null,
      issueForm: null,
      rectifiedParams: null,
      approvedForm: null,
      issueType: '',
      issueId: '',
      visible: false
    }
  }

  componentDidMount() {
    const locationParams = this.props.location.pathname.split('/');
    const issueId = locationParams[locationParams.length - 1];
    const issueType = locationParams[locationParams.length - 2];
    this.setState({ issueType, issueId });
    this.queryIssueFormDetail(issueId)
  }

  queryIssueFormDetail = (issueId) => {
    const me = this;
    // 获取问题单
    model.fetch(
      {_id: issueId},
      issueFormUrl,
      'get',
      function (response) {
        const issueForm = response.data.results[0];
        me.setState({ issueForm })
      },
      function(response) {
        message.warning('问题单加载失败，请重试')
      },
      false
    );
  };

  onRef = (ref) => {
    if (ref !== undefined) {
      this.uploadModificationParams = ref.uploadModificationParams;
    }
  };

  onRef2 = (ref) => {
    if (ref !== undefined) {
      this.getModificationParams = ref.getModificationParams;
    }
  };

  renderIssueForm = (issueType) => {
    const {
      issueForm
    } = this.state;

    if (issueForm !== null) {
      const domList = [];
      domList.push(<IssueFormOfReading key={"IssueFormOfReading"} issue_form={issueForm}/>);
      switch (issueType) {
        case '焊接非人为问题':
          domList.push(<WeldingModificationOfReading onRef={this.onRef2} key={"WeldingModificationOfReading"} issueForm={issueForm}/>);
          break;
        default:
          domList.push(<ArtificialIssueFormForReader onRef={this.onRef2} key={"ArtificialIssueFormForReader"} issueForm={issueForm}/>)
          break;
      }
      domList.push(<ApprovedFormOfEditing onRef={this.onRef} key={"ApprovedFormOfEditing"} getModificationParams={this.getModificationParams} issueForm={issueForm}/>);
      return domList
    } else {
      return <div className={"loadingStyle"}><Spin size="small" /><Spin /><Spin size="large" /></div>
    }
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.uploadModificationParams()
  };

  render() {
    const { issueType, issueId } = this.state;

    return (
      <div className={"IssueFormForReader"}>
        <PageHeader
          className={"pageHeader"}
          onBack={() => history.goBack()}
          title={issueType + "整改审核"}
          // subTitle="This is a subtitle"
        />
        <div className={"tablesStyle"}>
          {this.renderIssueForm(issueType)}
        </div>
        <Button
          type="primary"
          className={"rectifierSubmitButton"}
          onClick={() => this.setState({ visible: true })}
        >提交</Button>

        <div>
          <Modal
            title="提交确认"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            okText={'确认'}
            cancelText={'取消'}
          >
            <p>确认提交{ this.state.issueForm !== null ? this.state.issueForm.issue_type : '' }整改审核单？</p>
          </Modal>
        </div>
      </div>
    )
  }
}
