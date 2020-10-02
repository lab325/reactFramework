import React, { Component } from 'react'
import { Icon } from 'antd'
import "../weldingFormStyle.less"
import moment from "moment";

export default class TechnologyDetailSingleLine extends Component{
  constructor(props) {
    super(props)
    this.clickProblemIconFunction = this.props.clickProblemIconFunction
  }

  render() {
    const { singleLine } = this.props
    return (
      <tr>
        <td>{singleLine.program_code}</td>
        <td>{singleLine.hawkbill_pressure}</td>
        <td>{singleLine.pre_pressing_time}</td>
        <td>{singleLine.pre_heating_time}</td>
        <td>{singleLine.pre_heating_current}</td>
        <td>{singleLine.cooling_time}</td>
        <td>{singleLine.ramp_time}</td>
        <td>{singleLine.initial_current}</td>
        <td>{singleLine.welding_time_1}</td>
        <td>{singleLine.welding_current_1}</td>
        <td>{singleLine.pulse}</td>
        <td>{singleLine.interval_time}</td>
        <td>{singleLine.welding_time_2}</td>
        <td>{singleLine.welding_current_2}</td>
        <td>{singleLine.keeping_time}</td>
        <td>{singleLine.welding_joint_quantity}</td>
        <td>{singleLine.incremental_current}</td>
        <td>{singleLine.uir}</td>
        <td>
          <Icon
            type="read"
            theme="filled"
            style={{color: '#0099ff'}}
            onClick={() => {this.clickProblemIconFunction(singleLine)}}/>
        </td>
        <td>{singleLine.creator_name}</td>
        <td>{ moment(singleLine.created_date).format('YYYY-MM-DD HH:mm')}</td>
      </tr>
    )
  }
}
