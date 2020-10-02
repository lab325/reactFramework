import React, { Component } from 'react'

import PublicComponent from '../publicComponent'
import { showDefectType } from '../publicFunction'

export default class WeldingCheckFormForReader extends Component{
  constructor(props) {
    super(props)
    this.state = {
      test: false
    }
  }

  render() {
    const { weldingCheckForm } = this.props
    if ( weldingCheckForm === null || weldingCheckForm === undefined ) return null
    const defect_type = weldingCheckForm.defect_type_list
    const rework_selection = weldingCheckForm.rework_type_list

    return (
      <div>
        <table className="weldingCheckFormPublicComponent">
          <PublicComponent checkForm={weldingCheckForm}/>
          <tbody>
          <tr>
            <td>{ weldingCheckForm.checked_date.split(' ').splice(0, 1) }</td>
            <td>{ weldingCheckForm.checked_date.split(' ').splice(1, 1) }</td>
            <td>{ weldingCheckForm.checker_name }</td>
            <td>{ weldingCheckForm.vehicle_code }</td>
            <td>{ weldingCheckForm.defect_welding_joint_code }</td>
            <td>{ weldingCheckForm.work_station }</td>
            {
              defect_type.map((item, index) => {
                return (
                  <td
                    key={index}
                  >{ showDefectType(defect_type[index], 'defect') }</td>
                )
              })
            }
            {
              rework_selection.map((item, index) => {
                return (
                  <td key={index}/>
                )
              })
            }
            <td/>
            <td>{weldingCheckForm.rectifier_name}</td>
            <td/>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
