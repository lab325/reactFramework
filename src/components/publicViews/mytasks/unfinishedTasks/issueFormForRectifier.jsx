import React, { Component } from "react";
import {PageHeader, Spin, Button, Modal, message} from 'antd';

import {Model} from "../../../../dataModule/testBone";
import history from "../../../common/history";

import WeldingModificationFormOfEditing from "../../../../forms/welding/modificationFormOfEditing";
import GluingModificationFormOfEditing from "../../../../forms/gluing/modificationFormOfEditing";
import ArtificialModificationFormOfEditing from "../../../../forms/publicForm/artificialIssueForm/forRectifier";

import "../../issuePool/style.less";
import "../style.less";
import IssueFormOfReading from "../../../../forms/publicForm/issueForm/issueFormOfReading";
import ApprovedFormOfReading from "../../../../forms/publicForm/approvedForm/approvedFormOfReading";
import { issueFormUrl } from "../../../../dataModule/UrlList";

const model = new Model();

export default class IssueFormForRectifier extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issueType: '',
      issueForm: null,
      approvedForm: null,
      visible: false
    }
  }

  componentDidMount() {
    const locationParams = this.props.location.pathname.split('/');
    const issueId = locationParams[locationParams.length - 1];
    const issueType = locationParams[locationParams.length - 2];
    this.setState({ issueType: issueType })
    this.queryIssueFormDetail(issueId, issueType)
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
      },
      function(response) {
        message.warning('加载失败，请重试')
      },
      false
    );
  };

  onRef = (ref) => {
    if (ref !== undefined) {
      this.artificialForm = ref.state;
      this.uploadModificationParams = ref.uploadModificationParams;
    }
  };

  renderIssueForm = () => {
    const {
      issueForm,
      approvedForm
    } = this.state;

    if (issueForm !== null && approvedForm !== null) {
      const domList = [];
      domList.push(<IssueFormOfReading key={"IssueFormOfReading"} issue_form={issueForm}/>);
      domList.push('');
      domList.push(<ApprovedFormOfReading key={"ApprovedFormOfReading"} approvingForm={approvedForm} />);
      switch (issueForm.issue_type) {
        case '焊接非人为问题':
          domList[1] =
            <WeldingModificationFormOfEditing
              onRef={this.onRef}
              issueForm={issueForm}
              key={"WeldingModificationFormOfEditing"}
            />
          break;
        case '涂胶非人为问题':
          domList[1] =
            <GluingModificationFormOfEditing
              issueForm={issueForm}
              key={"GluingModificationFormOfEditing"}
            />
          break;
        default:
          // 人为问题整改表单
          domList[1] =
            <ArtificialModificationFormOfEditing
              onRef={this.onRef}
              issueForm={issueForm}
              key={"ArtificialModificationFormOfEditing"}
            />
          break;
      }
      return domList
    } else {
      return <div className={"loadingStyle"}><Spin size="small" /><Spin /><Spin size="large" /></div>
    }
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
    this.uploadModificationParams()
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { issueType } = this.state;

    return (
      <div className={"IssueFormForReader"}>
        <PageHeader
          className={"pageHeader"}
          onBack={() => history.goBack()}
          title={issueType + "整改"}
          // subTitle="This is a subtitle"
        />
        <div className={"tablesStyle"}>
          {this.renderIssueForm()}
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
            <p>确认提交{ this.state.issueForm !== null ? this.state.issueForm.issue_type : '' }整改单？</p>
          </Modal>
        </div>
      </div>
    )
  }
}
