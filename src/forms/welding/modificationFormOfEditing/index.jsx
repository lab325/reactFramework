import React, { Component } from 'react'
import { Select, message } from 'antd'

import { Model } from '../../../dataModule/testBone'
import { weldingParams, rectificationFormUrl } from '../../../dataModule/UrlList'
import { nowTime, getUserName } from '../../../publicFunction/index'
import SingleLine from '../modificationFormOfReading/singleLine'
import SingleLineOfEdit from './singleLineOfEdit'
import UploadRectifiedImage from "../../../publicComponents/uploadRectifiedImage";
import history from "../../../components/common/history";

import '../weldingFormStyle.less'
import '../../publicForm/publicFormStyle.less'

const { Option } = Select;
const model = new Model()

export default class ModificationFormOfEditing extends Component{
  constructor(props) {
    super(props);
    this.state = {
      originalParams: {},
      currentParams: {},
      modificationParams: {
        modified_date: nowTime(),
        rectifier_name: getUserName()
      },
      rectification_photograph: null,
      queryType: 'post'
    }
  }

  componentDidMount() {
    const { issueForm } = this.props
    // const { modificationParams } = this.state
    if (this.props.onRef !== undefined) this.props.onRef(this)
    // model.fetch(
    //   {
    //     welding_joint_code: issueForm.technology_code,
    //     review_status: 0,
    //     workshop_section: issueForm.workshop_section,
    //     work_station: issueForm.defect_work_station
    //   },
    //   weldingParams,
    //   'get',
    //   (response) => {
    //     if (response.data.results.length !== 0) {
    //       const oldModification = response.data.results[0]
    //       // 之前有整改记录，需要的是修改而不是新增
    //       this.setState({
    //         modificationParams: {
    //           ...modificationParams,
    //           ...oldModification
    //         },
    //         queryType: 'put'
    //       })
    //     }
    //   },
    //   null,
    //   false
    // )
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

  changeSelectValue = (val) => {
    const modificationParams = this.state.modificationParams;
    modificationParams.rework_plan = val;
    this.setState({ modificationParams: modificationParams })
  };

  editForm = (e) => {
    const modificationParams = this.state.modificationParams;
    const valueName = e.target.name;
    modificationParams[valueName] = e.target.value;
    this.setState({ modificationParams: modificationParams })
  };

  uploadModificationParams = () => {
    const { issueForm } = this.props
    const { modificationParams, currentParams, originalParams } = this.state
    const needParams = {
      ...currentParams,
      ...modificationParams,
      welding_joint_code: issueForm.technology_code,
      workshop_section: issueForm.workshop_section,
      work_station: issueForm.defect_work_station,
      params_version: 2,
      // 下面两条状态参数不可变更
      review_status: 0,
      using_status: 0
    }
    for (let i in needParams) {
      if (needParams[i] === '') {
        needParams[i] = null
      }
    }
    model.fetch(
      needParams,
      weldingParams,
      'post',
      function (response) {
        model.fetch(
          {
            params_id: response.data._id,
            issue_id: issueForm._id,
            vehicle_code: modificationParams.vehicle_code,
            rectified_reason: modificationParams.rectified_reason,
            rework_plan: modificationParams.rework_plan,
            rectification_measures: modificationParams.rectification_measures,
            deadline: modificationParams.deadline,
            rectified_items: JSON.stringify(Object.keys(modificationParams)),
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
      null,
      false
    )
  }

  render() {
    const {
      originalParams,
      currentParams,
      modificationParams,
      rectification_photograph
    } = this.state;

    return (
      <table className="weldingModificationFormOfReading">
        <thead>
        <tr>
          <th colSpan="20" className="first-th">焊接整改单</th>
        </tr>
        <tr>
          <th rowSpan="2"></th>
          <th rowSpan="2" colSpan="2">程序号</th>
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
        <SingleLineOfEdit lineTitle={'优化参数'} weldingParams={modificationParams} editForm={this.editForm}/>
        <tr>
          <td colSpan="4">照片说明(整改前)</td>
          <td colSpan="4">照片说明(整改后)</td>
          <td colSpan="2">跟踪车号</td>
          <td colSpan="3"><input value={modificationParams.vehicle_code} onChange={this.editForm} name="vehicle_code"/></td>
          <td colSpan="2">整改原因</td>
          <td colSpan="5"><input value={modificationParams.rectified_reason} onChange={this.editForm} name="rectified_reason"/></td>
        </tr>
        <tr>
          <td colSpan="4" rowSpan="4"></td>
          <td colSpan="4" rowSpan="4">
            <UploadRectifiedImage
              me={this}
              rectification_photograph={rectification_photograph}
              style={{height: '12rem', width: '100%'}}
            />
          </td>
          <td colSpan="2">返工方案</td>
          <td colSpan="10">
            <Select
              defaultValue={modificationParams.rework_plan}
              style={{ width: '100%', height: '100%', textAlign: "center" }}
              onChange={this.changeSelectValue}
              name="rework_plan"
              allowClear>
              <Option value="电焊">电焊</Option>
              <Option value="CO2焊">CO2焊</Option>
              <Option value="钎焊">钎焊</Option>
              <Option value="其它">其它</Option>
            </Select>
          </td>
        </tr>
        <tr>
          <td colSpan="2" style={{height: '6rem'}}>整改措施</td>
          <td colSpan="10" style={{height: '6rem'}}>
            <textarea
              rows="3"
              className="textAreaStyle"
              name="rectification_measures"
              value={modificationParams.rectification_measures}
              style={{marginTop: 10, height: '98%'}}
              onChange={this.editForm}/>
          </td>
          {/*<td colSpan="10" style={{height: '6rem'}}>{modificationParams.rectification_measures}</td>*/}
        </tr>
        <tr>
          <td colSpan="2">整改期限</td>
          <td colSpan="3">
            <input value={modificationParams.deadline} onChange={this.editForm} name="deadline"/>
          </td>
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
