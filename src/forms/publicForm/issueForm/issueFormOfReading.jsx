import React, { Component } from 'react'
import '../publicFormStyle.less'
import moment from "moment";

export default class IssueFormOfReading extends Component {
  constructor(props) {
    super(props)
    this.state = {
      issueForm: this.props.issue_form
    }
  }

  render() {
    const { issueForm } = this.state

    return (
      <table className="issueForm">
        <tbody>
          <tr>
            <td colSpan="4" style={{minWidth: '100%', borderTop: '1px solid black'}}>问题单</td>
          </tr>
          <tr>
            <td>问题单号</td>
            <td colSpan="3" className="threeColumnsTd">{issueForm.issue_code}</td>
          </tr>
          <tr>
            <td>提问人</td>
            <td>{issueForm.creator_name}</td>
            <td>提问人工号</td>
            <td>{issueForm.creator_code}</td>
          </tr>
          <tr>
            <td>提问时间</td>
            <td>{moment(issueForm.created_date).format('YYYY-MM-DD HH:mm:ss')}</td>
            <td>检验单</td>
            <td/>
          </tr>
          <tr>
            <td>车型</td>
            <td>{issueForm.vehicle_type}</td>
            <td>零件名称/零件号</td>
            <td>{issueForm.part_name} / {issueForm.partno}</td>
          </tr>
          <tr>
            <td>工段</td>
            <td>{issueForm.workshop_section}</td>
            <td>工位</td>
            <td>{issueForm.defect_work_station}</td>
          </tr>
          <tr>
            <td>机器人</td>
            <td>{issueForm.robot}</td>
            <td>工艺编号</td>
            <td>{issueForm.technology_code}</td>
          </tr>
          <tr>
            <td>问题类型</td>
            <td>{issueForm.issue_type}</td>
            <td>缺陷类型</td>
            <td>{issueForm.defect_type}</td>
          </tr>
          <tr>
            <td>备注</td>
            <td colSpan="3" className="threeColumnsTd">{issueForm.remark}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
