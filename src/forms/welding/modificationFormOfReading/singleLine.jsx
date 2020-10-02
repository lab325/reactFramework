import React , { Component } from 'react'

export default class SingleLine extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lineTitle: this.props.lineTitle
    }
  }

  render() {
    const { lineTitle } = this.state
    const { weldingParams } = this.props
    return (
      <tr>
        <td>{ lineTitle }</td>
        <td  colSpan="2">{ weldingParams.program_code }</td>
        <td>{ weldingParams.hawkbill_pressure }</td>
        <td>{ weldingParams.pre_pressing_time }</td>
        <td>{ weldingParams.pre_heating_time }</td>
        <td>{ weldingParams.pre_heating_current }</td>
        <td>{ weldingParams.cooling_time }</td>
        <td>{ weldingParams.ramp_time }</td>
        <td>{ weldingParams.initial_current }</td>
        <td>{ weldingParams.welding_time_1 }</td>
        <td>{ weldingParams.welding_current_1 }</td>
        <td>{ weldingParams.pulse }</td>
        <td>{ weldingParams.interval_time }</td>
        <td>{ weldingParams.welding_time_2 }</td>
        <td>{ weldingParams.welding_current_2 }</td>
        <td>{ weldingParams.keeping_time }</td>
        <td>{ weldingParams.welding_joint_quantity }</td>
        <td>{ weldingParams.incremental_current }</td>
        <td>{ weldingParams.uir }</td>
      </tr>
    )
  }
}
