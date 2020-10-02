import React, { Component } from 'react'

export default class SingleLineOfEdit extends Component {
  constructor(props) {
    super(props)
    this.editForm = this.props.editForm
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
        <td colSpan="2"><input value={weldingParams.program_code} onChange={this.editForm} name="program_code"/></td>
        <td><input value={weldingParams.hawkbill_pressure} onChange={this.editForm} name="hawkbill_pressure"/></td>
        <td><input value={weldingParams.pre_pressing_time} onChange={this.editForm} name="pre_pressing_time"/></td>
        <td><input value={weldingParams.pre_heating_time} onChange={this.editForm} name="pre_heating_time"/></td>
        <td><input value={weldingParams.pre_heating_current} onChange={this.editForm} name="pre_heating_current"/></td>
        <td><input value={weldingParams.cooling_time} onChange={this.editForm} name="cooling_time"/></td>
        <td><input value={weldingParams.ramp_time} onChange={this.editForm} name="ramp_time"/></td>
        <td><input value={weldingParams.initial_current} onChange={this.editForm} name="initial_current"/></td>
        <td><input value={weldingParams.welding_time_1} onChange={this.editForm} name="welding_time_1"/></td>
        <td><input value={weldingParams.welding_current_1} onChange={this.editForm} name="welding_current_1"/></td>
        <td><input value={weldingParams.pulse} onChange={this.editForm} name="pulse"/></td>
        <td><input value={weldingParams.interval_time} onChange={this.editForm} name="interval_time"/></td>
        <td><input value={weldingParams.welding_time_2} onChange={this.editForm} name="welding_time_2"/></td>
        <td><input value={weldingParams.welding_current_2} onChange={this.editForm} name="welding_current_2"/></td>
        <td><input value={weldingParams.keeping_time} onChange={this.editForm} name="keeping_time"/></td>
        <td><input value={weldingParams.welding_joint_quantity} onChange={this.editForm} name="welding_joint_quantity"/></td>
        <td><input value={weldingParams.incremental_current} onChange={this.editForm} name="incremental_current"/></td>
        <td><input value={weldingParams.uir} onChange={this.editForm} name="uir"/></td>
      </tr>
    )
  }
}
