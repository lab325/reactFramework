// 当作为浏览组件时，可以传入问题单链接组件
import React, { Component } from 'react'
import PublicComponent from '../publicComponent'
import { showDefectType } from '../publicFunction'
import { getUserName } from '../../../../publicFunction/index'

export default class WeldingCheckFormForRectifier extends Component{
  constructor(props) {
    super(props)
    this.clickFunction = this.props.clickFunction !== undefined
      ? this.props.clickFunction
      : function() { console.log('提交事件，参数 1 是 defectTypeList，参数 2 是 reworkTypeList，参数 3 是 checkForm') }
    const defectTypeList = this.props.weldingCheckForm.defect_type.length !== 0 ? this.props.weldingCheckForm.defect_type : [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0]
    const reworkTypeList = this.props.weldingCheckForm.rework_selection.length !== 0 ? this.props.weldingCheckForm.rework_selection : [0, 0, 0, 0]
    // 问题单链接组件
    this.issueFormLink = this.props.issueFormLink !== undefined ? this.props.issueFormLink : null
    this.props.weldingCheckForm.rectifier_name = getUserName()
    this.state = {
      test: false,
      defectTypeList: defectTypeList,
      reworkTypeList: reworkTypeList,
      checkForm: this.props.weldingCheckForm
    }
  }

  componentDidMount() {
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
                  <td key={index}>{ showDefectType(defectTypeList[index], 'defect') }</td>
                )
              })
            }
            {
              reworkTypeList.map((item, index) => {
                return (
                  <td key={index}>{ showDefectType(reworkTypeList[index], 'rework') }</td>
                )
              })
            }
            <td/>
            <td>{ checkForm.rectifier_name }</td>
            <td>{ this.issueFormLink }</td>
          </tr>
          </tbody>
        </table>
        <button
          onClick={() => this.clickFunction(defectTypeList, reworkTypeList, checkForm)}
          className="buttonOfWeldingCheckFormForChecker"
        >提交</button>
      </div>
    )
  }
}
