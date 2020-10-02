import React, { Component } from 'react'
import { Icon } from 'antd'
import '../gluingFormStyle.less'

export default class GluingDetailSingleLine extends Component{
  constructor(props) {
    super(props)
    this.clickProblemIconFunction = this.props.clickProblemIconFunction
    this.state = {
      singleLine: this.props.singleLine
    }
  }

  render() {
    const { singleLine } = this.state
    return (
      <tr>
        <td>{singleLine.gluing_code}</td>
        <td>{singleLine.property1}</td>
        <td>{singleLine.gluing_model}</td>
        <td>{singleLine.gluing_type}</td>
        <td>{singleLine.connector_1}</td>
        <td>{singleLine.connector_2}</td>
        <td>{singleLine.actual_length_required}</td>
        <td>{singleLine.actual_calipering_required}</td>
        <td>{singleLine.draw_length_required}</td>
        <td>{singleLine.draw_area_required}</td>
        <td>{singleLine.gluing_character}</td>
        <td>{singleLine.TLD_code}</td>
        <td>{singleLine.applicable_temp}</td>
        <td>{singleLine.TZ_drawing_code}</td>
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
