import React, { Component } from 'react'
import { Radio } from 'antd'
import '../publicFormStyle.less'

export default class ApprovedFormOfReading extends Component{
  constructor(props) {
    super(props)
    this.state = {
      approvingForm: this.props.approvingForm
    }
  }

  render() {
    const { approvingForm } = this.state

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
              <Radio.Group value={approvingForm.approved_conclusion}>
                <Radio value={1}>通过</Radio>
                <Radio value={0}>不通过</Radio>
              </Radio.Group>
            </td>
            <td />
            <td />
          </tr>
          <tr>
            <td>审核建议</td>
            <td colSpan="3" style={{minWidth: '75%'}}>{ approvingForm.approved_advice }</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
