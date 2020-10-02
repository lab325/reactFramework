import React, { Component } from "react";
import {Select, Button, message} from "antd";

import InputStyleUploadFile from '../../../publicComponents/inputStyleUploadFile'
import { uploadFile } from '../../../dataModule/uploadFile'
import { uploadWeldingParams } from '../../../dataModule/UrlList'
import {Model} from "../../../dataModule/testBone";

const { Option } = Select;

export default class ImportWeldingParams extends Component {
  constructor(props) {
    super(props)
    this.state = {
      workshop_section: '',
      vehicle_type: '',
      whetherAuto: '',
      technology_type: '',
      file: null
    }
  }

  setSelectedFile = (doc) => {
    this.setState({
      file: doc
    })
  }

  clickUploadFile = () => {
    const rawParams = this.state
    const keys = Object.keys(rawParams)
    const params = {}
    for (let i = 0; i < keys.length; i++) {
      if (rawParams[keys[i]] === '' || rawParams[keys[i]] === null) {
        message.warning('请填写完整')
        return
      }
      params[keys[i]] = rawParams[keys[i]]
    }
    uploadFile(this, uploadWeldingParams, params)
  }

  handleChange = (value, type) => {
    if (value === undefined || value === '') value = null
    const checkForm = this.state
    checkForm[type] = value
    this.setState(checkForm)
  }

  render() {
    const { technology_type, whetherAuto, vehicle_type, workshop_section } = this.state
    return (
      <div className={"otherIssues"}>
        <span className="titleOfViews">焊接参数导入</span>
        <div className="weldingCheckForm" style={{marginBottom: 0}}>
          <div className="weldingCheckFormLeft">
            <div><span>工段：</span></div>
            <div><span>车型：</span></div>
            <div><span>自动/手工：</span></div>
            <div><span>工艺类型：</span></div>
            <div><span>文件上传：</span></div>
          </div>
          <div className="weldingCheckFormRight">
            <Select
              onChange={(value) => this.handleChange(value, 'workshop_section')}
              value={workshop_section}
              className="formItem"
              allowClear
            >
              <Option value={'AFO 52301'}>AFO 52301</Option>
            </Select>
            <Select
              onChange={(value) => this.handleChange(value, 'vehicle_type')}
              value={vehicle_type}
              className="formItem"
              allowClear
            >
              <Option value={'Tiguan L'}>Tiguan L</Option>
            </Select>
            <Select
              onChange={(value) => this.handleChange(value, 'whetherAuto')}
              value={whetherAuto}
              className="formItem"
              allowClear
            >
              <Option value={'手工焊接'}>手工焊接</Option>
              <Option value={'自动焊接'}>自动焊接</Option>
            </Select>
            <Select
              onChange={(value) => this.handleChange(value, 'technology_type')}
              value={technology_type}
              className="formItem"
              allowClear
            >
              <Option value={'点焊'}>点焊</Option>
              <Option value={'激光钎焊'}>激光钎焊</Option>
              <Option value={'深熔焊'}>深熔焊</Option>
              <Option value={'普通焊缝'}>普通焊缝</Option>
              <Option value={'FDS'}>FDS</Option>
              <Option value={'压铆螺母'}>压铆螺母</Option>
              <Option value={'螺柱焊'}>螺柱焊</Option>
              <Option value={'凸焊螺母'}>凸焊螺母</Option>
              <Option value={'拉铆螺母'}>拉铆螺母</Option>
              <Option value={'钣金咬合'}>钣金咬合</Option>
            </Select>
            <InputStyleUploadFile setSelectedFile={this.setSelectedFile} className={"formItem"}/>
            <Button type="primary" onClick={this.clickUploadFile}>提交</Button>
          </div>
        </div>
      </div>
    )
  }
}
