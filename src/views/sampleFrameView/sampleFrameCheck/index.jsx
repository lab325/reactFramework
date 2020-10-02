import React, { Component } from "react";
import { Input } from "antd";

import { handleChange } from "../../../publicFunction";

import "./style.less";
import '../../../components/publicViews/publicStyleInViews.less';
import '../../weldingViews/weldingCheckView/style.less';

export default class SampleFrameCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle_type: null,
      sample_frame_name: null,
      part_code: null,
      sample_frame_code: null,
      QRK_code: null,
      shifts: null
    };
    this.handleChange = handleChange.bind(this)
  }

  render() {
    const {
      vehicle_type,
      sample_frame_name,
      part_code,
      sample_frame_code,
      QRK_code,
      shifts
    } = this.state;

    return (
      <div className={"SampleFrameCheck"}>
        <span className="titleOfViews">样架测量检验</span>
        <div className={"sampleFrameCheckForm"}>
          <div className={"weldingCheckForm leftOfSampleFrameCheckForm"}>
            <div className="weldingCheckFormLeft">
              <div><span>车型：</span></div>
              <div><span>所测总成名称：</span></div>
              <div><span>零件号：</span></div>
              <div><span>检具号：</span></div>
              <div><span>班次：</span></div>
              <div><span>QRK 编号：</span></div>
            </div>
            <div className="weldingCheckFormRight">
              <Input onChange={(e) => this.handleChange(e.target.value, 'vehicle_type', this)} value={vehicle_type} className="itemInSampleFrame"/>
              <Input onChange={(e) => this.handleChange(e.target.value, 'sample_frame_name', this)} value={sample_frame_name} className="itemInSampleFrame"/>
              <Input onChange={(e) => this.handleChange(e.target.value, 'part_code', this)} value={part_code} className="itemInSampleFrame"/>
              <Input onChange={(e) => this.handleChange(e.target.value, 'sample_frame_code', this)} value={sample_frame_code} className="itemInSampleFrame"/>
              <Input onChange={(e) => this.handleChange(e.target.value, 'shifts', this)} value={shifts} className="itemInSampleFrame"/>
              <Input onChange={(e) => this.handleChange(e.target.value, 'QRK_code', this)} value={QRK_code} className="itemInSampleFrame"/>
            </div>
            <div style={{clear: 'both'}}/>
            <div style={{width: '100%', minHeight: 200, backgroundColor: 'red'}}/>
          </div>
          <div className={"rightOfSampleFrameCheckForm"}></div>
        </div>
      </div>
    )
  }
}
