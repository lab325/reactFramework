import React, { Component } from "react";
import {message} from "antd";

import "../publicFormStyle.less";

import {rectificationFormUrl, artificialIssueRectificationUrl} from "../../../dataModule/UrlList";
// import history from "../../../components/common/history";
import { Model } from "../../../dataModule/testBone"
import moment from "moment";

const model = new Model();

export default class ForReader extends Component{
  constructor(props) {
    super(props);
    this.state = {
      issueForm: this.props.issueForm,
      rectificationForm: {},
      artificialIssueRectificationForm: {}
    }
  }

  componentDidMount() {
    const me = this;
    const { issueForm } = this.state;
    model.fetch(
      { issue_id: issueForm._id },
      rectificationFormUrl,
      'get',
      (response) => {
        const rectificationForm = response.data[0];
        me.setState({
          rectificationForm
        })
      },
      (err) => {
        message.error('整改单获取失败！')
      },
      false
    )
    model.fetch(
      { issue_id: issueForm._id },
      artificialIssueRectificationUrl,
      'get',
      (response) => {
        const artificialIssueRectificationForm = response.data[0];
        me.setState({
          artificialIssueRectificationForm
        })
      },
      (err) => {
        message.error('整改单获取失败！')
      },
      false
    )
  };

  render() {
    const {rectificationForm, artificialIssueRectificationForm, issueForm} = this.state;
    const finalForm = {...rectificationForm, ...artificialIssueRectificationForm};

    return (
      <table className={"ModificationFormOfReading"}>
        <thead>
          <tr><th colSpan="4" className={"tableTitle"}>问题整改</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>整改人</td>
            <td>{issueForm.rectifier_name}</td>
            <td rowSpan={3}>备注</td>
            <td rowSpan={3}>{finalForm.remark}</td>
          </tr>
          <tr>
            <td>整改人工号</td>
            <td>{issueForm.rectifier_id}</td>
          </tr>
          <tr>
            <td>整改时间</td>
            <td>{moment(finalForm.created_date).format('YYYY-MM-DD HH:mm:ss')}</td>
          </tr>
          <tr>
            <td style={{height: '4.6rem'}}>整改措施</td>
            <td style={{height: '4.6rem'}} colSpan={3}>{finalForm.rectification_measures}</td>
          </tr>
          <tr>
            <td>附件</td>
            <td><span className={"accessoryButton"}>下载附件</span></td>
            <td />
            <td />
          </tr>
          <tr>
            <td colSpan={2}>整改前照片</td>
            <td colSpan={2}>整改后照片</td>
          </tr>
          <tr>
            <td colSpan={2} style={{height: '12rem'}}></td>
            <td colSpan={2} style={{height: '12rem'}}></td>
          </tr>
        </tbody>
      </table>
    )
  }
}
