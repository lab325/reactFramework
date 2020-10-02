import React, { Component } from 'react';
import { Radio, message } from 'antd';

import { nowTime, getUserName, getUserId } from '../../../publicFunction/index';
import {issueFormUrl, activitiSupportUrl, weldingParams} from '../../../dataModule/UrlList';
import {Model} from "../../../dataModule/testBone";
import history from "../../../components/common/history";

import '../publicFormStyle.less'

const model = new Model();

export default class ApprovedFormOfEditing extends Component{
  constructor(props) {
    super(props);
    this.state = {
      approvingForm: {
        approver_name: getUserName(),
        approved_date: nowTime(),
        approved_conclusion: '',
        approved_advice: '',
      }
    }
  };

  componentDidMount() {
    if (this.props.onRef !== undefined) {
      this.props.onRef(this)
    }
  };

  editForm = (e) => {
    const approvingForm = this.state.approvingForm;
    const valueName = e.target.name;
    approvingForm[valueName] = e.target.value;
    this.setState({ approvingForm: approvingForm })
  };

  uploadModificationParams = () => {
    const {approvingForm} = this.state;
    const {issueForm} = this.props;
    this.updateParams()
    model.fetch(
      {
        reviewer_id: getUserId(),
        review_advice: approvingForm.approved_advice,
        review_conclusion: parseInt(approvingForm.approved_conclusion)
      },
      issueFormUrl + issueForm._id + '/' ,
      'put',
      (res) => {
        if (approvingForm.approved_conclusion === 1) {
          this.updateParams()
        }
      },
      (err) => {
        console.log('err', err)
      },
      false
    )
  };

  updateParams = () => {
    const {issueForm} = this.props;
    const rectifiedParam = this.props.getModificationParams();
    rectifiedParam.review_status = 0;
    rectifiedParam.using_status = 0;
    rectifiedParam.creator_name = issueForm.rectifier_name;
    rectifiedParam.creator_id = issueForm.rectifier_id;
    model.fetch(
      {issue_id: issueForm._id},
      activitiSupportUrl,
      'get',
      (res) => {
        if (res.data[0].taskKey === 'end') {
          rectifiedParam.review_status = 1;
          rectifiedParam.using_status = 1;
          model.fetch(
            rectifiedParam,
            weldingParams,
            'POST',
            (res) => {
              console.log(res)
            },
            (err) => {
              console.log(err)
            },
            false
          )
        }
        history.goBack()
      },
      (err) => {
        message.error('修改参数失败')
      },
      false
    )
  };

  render() {
    const { approvingForm } = this.state;

    return (
      <table className="ApprovedFormOfReading">
        <thead>
        <tr>
          <th colSpan="4" style={{minWidth: '100%'}}>审核表</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>审核人</td>
          <td>{ approvingForm.approver_name }</td>
          <td>审核时间</td>
          <td>{ approvingForm.approved_date }</td>
        </tr>
        <tr>
          <td>审核结论</td>
          <td>
            <Radio.Group
              value={approvingForm.approved_conclusion}
              onChange={this.editForm}
              name="approved_conclusion">
              <Radio value={1}>通过</Radio>
              <Radio value={0}>不通过</Radio>
            </Radio.Group>
          </td>
          <td />
          <td />
        </tr>
        <tr>
          <td style={{height: '2.6rem', lineHeight: '2.6rem'}}>审核建议</td>
          <td colSpan="3" style={{minWidth: '75%', height: '2.6rem'}}>
            <textarea
              rows="1"
              className="textAreaStyle"
              name="approved_advice"
              onChange={this.editForm}
              value={approvingForm.approved_advice}/>
          </td>
        </tr>
        </tbody>
      </table>
    )
  }
}
