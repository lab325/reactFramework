import React, { Component } from 'react'
import { Button } from 'antd'

import PublicComponent from '../publicComponent'
import {
  showDefectType,
  clickDefectOrReworkTd,
  transformIntoArray
} from '../publicFunction'

export default class WeldingCheckFormForChecker extends Component{
  constructor(props) {
    super(props)
    this.clickFunction = this.props.clickFunction !== undefined
      ? this.props.clickFunction
      : function() { console.log('提交事件，参数 1 是 defectTypeList，参数 2 是 reworkTypeList，参数 3 是 checkForm') }
    let defectTypeList = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let reworkTypeList = [0, 0, 0, 0]
    let weldingCheckForm
    if (this.props.weldingCheckForm !== undefined) {
      weldingCheckForm = this.props.weldingCheckForm
      defectTypeList = this.props.weldingCheckForm.defect_type === undefined ? [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : transformIntoArray(this.props.weldingCheckForm.defect_type, 'defect')
      reworkTypeList = this.props.weldingCheckForm.rework_selection === undefined ? [0, 0, 0, 0] : transformIntoArray(this.props.weldingCheckForm.rework_selection, 'rework')
    } else {
      weldingCheckForm = {
        checked_date: '',
        checker_name: '',
        vehicle_code: '',
        defect_welding_joint_code: '',
        defect_work_station: ''
      }
    }
    this.state = {
      test: false,
      defectTypeList: defectTypeList,
      reworkTypeList: reworkTypeList,
      checkForm: weldingCheckForm
    }
  }

  render() {
    const { defectTypeList, reworkTypeList, checkForm } = this.state

    return (
      <div>
        <table className="weldingCheckFormPublicComponent">
          <PublicComponent checkForm={checkForm}/>
          <tbody>
            <tr>
              <td>{ checkForm.checked_date.split(' ').splice(0, 1) }</td>
              <td>{ checkForm.checked_date.split(' ').splice(1, 1) }</td>
              <td>{ checkForm.checker_name }</td>
              <td>{ checkForm.vehicle_code }</td>
              <td>{ checkForm.defect_welding_joint_code }</td>
              <td>{ checkForm.defect_work_station }</td>
              {
                defectTypeList.map((item, index) => {
                  return (
                    <td
                      key={index}
                      onClick={() => clickDefectOrReworkTd(index, 'defect', this)}
                    >{ showDefectType(defectTypeList[index], 'defect') }</td>
                  )
                })
              }
              {
                reworkTypeList.map((item, index) => {
                  return (
                    <td key={index}/>
                  )
                })
              }
              <td/>
              <td>{checkForm.rectifier}</td>
              <td/>
            </tr>
          </tbody>
        </table>
        <Button
          type="primary"
          style={{marginTop: 10, float: "right", width: "6rem"}}
          onClick={() => this.clickFunction(defectTypeList, reworkTypeList, checkForm)}
        >提交</Button>
      </div>
    )
  }
}
