import React, { Component } from 'react'
import { Icon } from 'antd'
import './fixtureFormStyle.less'

export default class TechnologyDetailSingleLine extends Component{
  constructor(props) {
    super(props)
    this.clickProblemIconFunction = this.props.clickProblemIconFunction
    this.state = {
      singleLine: this.props.singleLine
    }
  }

  render() {
    const { singleLine } = this.state
    const supervised_torque_2_date = singleLine.supervised_torque_2_date
    return (
      <tr>
        <td>{singleLine.workshop_section}</td>
        <td>{singleLine.work_station}</td>
        <td>x</td>
        <td>{singleLine.gluing_or_auto_lock}</td>
        <td>{singleLine.description}</td>
        <td>{singleLine.external_threaded_part}</td>
        <td>{singleLine.internal_threaded_part}</td>
        <td>{singleLine.connected_part}</td>
        <td>{singleLine.Pr_Nr}</td>
        <td>{singleLine.model_and_specification}</td>
        <td>{singleLine.number}</td>
        <td>{singleLine.bolt_code}</td>
        <td>{singleLine.tighten_way}</td>
        <td>{singleLine.target_torque_1}</td>
        <td>{singleLine.supervised_torque_1}</td>
        <td>{singleLine.supervised_angles_1}</td>
        <td>{singleLine.changed_date_1}</td>
        <td>{singleLine.target_torque_2}</td>
        <td>{singleLine.supervised_angles_2}</td>
        <td>{singleLine.supervised_torque_2}</td>
        {
          Object.keys(supervised_torque_2_date).map((item, index) => {
            return <td key={index}>{supervised_torque_2_date[item]}</td>
          })
        }
        <td>{singleLine.changed_date_2}</td>
        <td>{singleLine.code_or_page_num}</td>
        <td>{singleLine.pdm_date}</td>
        <td>{singleLine.TLD}</td>
        <td>{singleLine.kat_A}</td>
        <td>{singleLine.kat_B}</td>
        <td>{singleLine.pre_tighten_tool}</td>
        <td>{singleLine.pre_tighten_torque}</td>
        <td>{singleLine.pre_tighten_model}</td>
        <td>{singleLine.emergency_tighten_model}</td>
        <td>{singleLine.IP}</td>
        <td>
          <Icon
            type="read"
            theme="filled"
            style={{color: '#0099ff'}}
            onClick={() => {this.clickProblemIconFunction(singleLine)}}/>
        </td>
        <td>{singleLine.rectifier_name}</td>
        <td>{singleLine.rectified_date}</td>
      </tr>
    )
  }
}
