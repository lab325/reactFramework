import React, { Component } from 'react'
import SingleLine from './singleLine'
import {weldingParams, rectificationFormUrl} from "../../../dataModule/UrlList";
import {Model} from "../../../dataModule/testBone";

const model = new Model()

export default class modificationFormOfReading extends Component{
  constructor(props) {
    super(props)
    this.state = {
      originalParams: {},
      currentParams: {},
      modificationParams: {}
    }
  }

  componentDidMount() {
    const { issueForm } = this.props
    model.fetch(
      {
        issue_id: issueForm._id
      },
      rectificationFormUrl,
      'get',
      (response) => {
        if (response.data.length !== 0) {
          const rectificationForm = response.data[0]
          model.fetch(
            {_id: rectificationForm.params_id},
            weldingParams,
            'get',
            (weldingResponse) => {
              const gotWeldingParams = weldingResponse.data.results[0]
              this.setState({
                modificationParams: {
                  ...gotWeldingParams,
                  ...rectificationForm
                }
              })
            },
            null,
            false
          )
        }
      },
      null,
      false
    )
    model.fetch(
      {
        params_version: 1,
        welding_joint_code: issueForm.technology_code,
        workshop_section: issueForm.workshop_section,
        work_station: issueForm.defect_work_station
      },
      weldingParams,
      'get',
      (response) => {
        if (response.data.results.length !== 0) {
          const originalParams = response.data.results[0]
          this.setState({originalParams})
        }
      },
      null,
      false
    )
    model.fetch(
      {
        review_status: 1,
        using_status: 1,
        welding_joint_code: issueForm.technology_code,
        workshop_section: issueForm.workshop_section,
        work_station: issueForm.defect_work_station
      },
      weldingParams,
      'get',
      (response) => {
        if (response.data.results.length !== 0) {
          const currentParams = response.data.results[0]
          this.setState({currentParams})
        }
      },
      null,
      false
    )
  }

  getModificationParams = () =>  {
    return this.state.modificationParams;
  };

  render() {
    const { originalParams, currentParams, modificationParams } = this.state
    if (this.props.onRef !== undefined) this.props.onRef(this)

    return (
      <table className="weldingModificationFormOfReading">
        <thead>
          <tr>
            <th colSpan="20" className="first-th">焊接整改单</th>
          </tr>
          <tr>
            <th rowSpan="2"></th>
            <th rowSpan="2" style={{minWidth: '7rem'}}>焊点编号</th>
            <th rowSpan="2">程序号</th>
            <th rowSpan="2">焊接压力/KN</th>
            <th rowSpan="2">预压时间/ms</th>
            <th colSpan="3">预热</th>
            <th colSpan="2">斜坡</th>
            <th colSpan="3">第一次焊接</th>
            <th rowSpan="2">间隔时间/ms</th>
            <th colSpan="2">第二次焊接</th>
            <th rowSpan="2">保持时间/ms</th>
            <th colSpan="2">递增器</th>
            <th>UIR</th>
          </tr>
          <tr>
            <th>预热时间/ms</th>
            <th>预热电流/KA</th>
            <th>冷却时间/ms</th>
            <th>斜坡时间/ms</th>
            <th>起始电流/KA</th>
            <th>焊接时间/ms</th>
            <th>焊接电流/KS</th>
            <th>脉冲</th>
            <th>焊接时间/ms</th>
            <th>焊接电流/KS</th>
            <th>焊点数</th>
            <th>递增电流</th>
            <th>开/关</th>
          </tr>
        </thead>
        <tbody>
          <SingleLine lineTitle={'原始参数'} weldingParams={originalParams}/>
          <SingleLine lineTitle={'当前参数'} weldingParams={currentParams}/>
          <SingleLine lineTitle={'优化参数'} weldingParams={modificationParams}/>
          <tr>
            <td colSpan="4">照片说明(整改前)</td>
            <td colSpan="4">照片说明(整改后)</td>
            <td colSpan="2">跟踪车号</td>
            <td colSpan="3">{modificationParams.tracking_vehicle_code}</td>
            <td colSpan="2">整改原因</td>
            <td colSpan="5">{modificationParams.modified_reason}</td>
          </tr>
          <tr>
            <td colSpan="4" rowSpan="4"></td>
            <td colSpan="4" rowSpan="4"></td>
            <td colSpan="2">返工方案</td>
            <td colSpan="10">{modificationParams.rework_plan}</td>
          </tr>
          <tr>
            <td colSpan="2" style={{height: '6rem'}}>整改措施</td>
            <td colSpan="10" style={{height: '6rem'}}>{modificationParams.modification_measures}</td>
          </tr>
          <tr>
            <td colSpan="2">整改期限</td>
            <td colSpan="3">{modificationParams.deadline}</td>
            <td colSpan="7"></td>
          </tr>
          <tr>
            <td colSpan="2">整改人</td>
            <td colSpan="3">{modificationParams.rectifier_name}</td>
            <td colSpan="2">整改时间</td>
            <td colSpan="5">{modificationParams.modified_date}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}
