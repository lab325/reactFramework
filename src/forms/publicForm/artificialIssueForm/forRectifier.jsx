import React, { Component } from "react";
import {Icon, message} from "antd";

import UploadRectifiedImage from "../../../publicComponents/uploadRectifiedImage";
import { nowTime, getUserName, nowTimeBigInt } from "../../../publicFunction";
import {rectificationFormUrl, artificialIssueRectificationUrl } from "../../../dataModule/UrlList";
import history from "../../../components/common/history";
import { Model } from "../../../dataModule/testBone"

import "../publicFormStyle.less";

const model = new Model();

export default class ForRectifier extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checkReport: null,
      documentName: '',
      rectification_photograph: null,
      remark: null,
      rectification_measures: null,
      rectified_date: nowTimeBigInt(),
      rectifier_name: getUserName(),
      deadline: null
    }
  }

  componentDidMount() {
    if (this.props.onRef !== undefined) {
      this.props.onRef(this)
    }
  }

  uploadModificationParams = () => {
    const { issueForm } = this.props
    const {
      checkReport,
      rectification_photograph,
      remark,
      rectification_measures,
      deadline
    } = this.state
    const form = {
      issue_id: issueForm._id,
      attachment: checkReport,
      rectification_photograph,
      remark,
      rectification_measures,
      status: 0,
      deadline
    }
    model.fetch(
      form,
      artificialIssueRectificationUrl,
      'post',
      (res) => {
        model.fetch(
          {
            issue_id: issueForm._id,
            vehicle_code: issueForm.vehicle_code,
            rectification_measures,
            deadline,
            status: 0
          },
          rectificationFormUrl,
          'post',
          (response) => {
            message.success('整改单提交成功！')
            history.push('/technology-system/unfinished-tasks')
          },
          (err) => {
            message.error('整改单提交失败！')
          },
          false
        )
      },
      (err) => {
        message.error('整改单提交失败！')
      },
      false
    )
  }

  clickInput = (id) => {
    const documentInput = document.querySelector(id);
    documentInput.click()
  };

  selectFile = (id) => {
    const me = this;
    const documentInput = document.querySelector(id);
    if (documentInput.files[0] === undefined) return;
    const uploadedDocument = documentInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadedDocument);
    reader.onload = function() {
      const base64Str = this.result;
      me.setState({
        checkReport: base64Str,
        documentName: documentInput.files[0].name
      })
    }
  };

  clearFile = (type) => {
    this.setState({
      documentName: '',
      checkReport: null
    })
  };

  render() {
    const {
      documentName,
      rectification_photograph,
      deadline
    } = this.state;

    return (
      <table className={"ModificationFormOfReading"}>
        <thead>
        <tr><th colSpan="4" className={"tableTitle"}>问题整改</th></tr>
        </thead>
        <tbody>
        <tr>
          <td>整改人</td>
          <td>{ getUserName() }</td>
          <td rowSpan={3}>备注</td>
          <td rowSpan={3}>
            <textarea
              className={"textareaInForm"}
              onChange={(e) => this.setState({ remark: e.target.value })}
            /></td>
        </tr>
        <tr>
          <td>整改人工号</td>
          <td />
        </tr>
        <tr>
          <td>整改时间</td>
          <td>{nowTime()}</td>
        </tr>
        <tr>
          <td style={{height: '4.6rem'}}>整改措施</td>
          <td style={{height: '4.6rem'}} colSpan={3}>
            <textarea
              className={"textareaInForm"}
              onChange={(e) => this.setState({ rectification_measures: e.target.value })}
            />
          </td>
        </tr>
        <tr>
          <td>附件</td>
          <td>
            <input
              type="text"
              className="avatval"
              id="avatval"
              value={documentName}
              placeholder={"请选择文件···"}
              readOnly="readonly"
              onClick={() => this.clickInput('#avatar')}
              onChange={null}
            />
            <input
              type="file"
              className="avatar"
              name="avatar"
              id="avatar"
              onChange={() => this.selectFile('#avatar')}
            />
            <Icon
              type="close-circle"
              theme="filled"
              className={"closeIcon"}
              onClick={() => this.clearFile()}
            />
          </td>
          <td>整改期限</td>
          <td><input value={deadline} onChange={(e) => this.setState({ deadline: e.target.value })}/></td>
        </tr>
        <tr>
          <td colSpan={2}>整改前照片</td>
          <td colSpan={2}>整改后照片</td>
        </tr>
        <tr>
          <td colSpan={2} style={{height: '12rem'}}></td>
          <td colSpan={2} style={{height: '12rem'}}>
            <UploadRectifiedImage me={this} rectification_photograph={rectification_photograph}/>
          </td>
        </tr>
        </tbody>
      </table>
    )
  }
}
