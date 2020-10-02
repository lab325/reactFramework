import React, { Component } from 'react'
import '../weldingFormStyle.less'

export default class PublicComponent extends Component{
  constructor(props) {
    super(props)
    const checkForm = this.props.checkForm !== undefined ? this.props.checkForm : null
    this.shiftComponent = this.props.shiftComponent !== undefined ? this.props.shiftComponent : null
    this.partNoComponent = this.props.partNoComponent !== undefined ? this.props.partNoComponent : null
    this.partNameComponent = this.props.partNameComponent !== undefined ? this.props.partNameComponent : null
    this.state = {
      checkForm: checkForm
    }
  }

  render() {
    const { checkForm } = this.state
    return (
      <thead>
        <tr>
          <th colSpan="20" rowSpan="2">TFA3B{ checkForm.technology_type }焊接缺陷汇总卡</th>
          <th className="narrowUnitStyleInWeldingCheckForm">零件名称</th>
          <th colSpan="2">{checkForm.part_name}</th>
          <th colSpan="2">车型</th>
        </tr>
        <tr>
          <th colSpan="3">零件号：{checkForm.partno}</th>
          <th colSpan="2">{checkForm.vehicle_type}</th>
        </tr>
        <tr>
          <th colSpan="2">工段：{checkForm.workshop_section}</th>
          <th colSpan="2">班次：{checkForm.shifts}</th>
          <th colSpan="2">缺陷信息</th>
          <th colSpan="12">缺陷类型</th>
          <th colSpan="4">返工</th>
          <th>整改措施及期限</th>
          <th>整改人</th>
          <th>问题单</th>
        </tr>
        <tr>
          <th>日期</th>
          <th>检验时间</th>
          <th>检验人</th>
          <th>车号(钢印或条码)</th>
          <th>缺陷{ checkForm.technology_type }编号</th>
          <th>缺陷工位</th>
          <th className="narrowUnitStyleInWeldingCheckForm">存在</th>
          <th className="narrowUnitStyleInWeldingCheckForm">裂纹</th>
          <th className="narrowUnitStyleInWeldingCheckForm">爆穿</th>
          <th className="narrowUnitStyleInWeldingCheckForm">凹坑</th>
          <th className="narrowUnitStyleInWeldingCheckForm">锐边焊瘤和焊刺</th>
          <th className="narrowUnitStyleInWeldingCheckForm">飞溅</th>
          <th className="narrowUnitStyleInWeldingCheckForm">位置</th>
          <th className="narrowUnitStyleInWeldingCheckForm">边界距离</th>
          <th className="narrowUnitStyleInWeldingCheckForm">焊点间距</th>
          <th className="narrowUnitStyleInWeldingCheckForm">焊缝间距</th>
          <th className="narrowUnitStyleInWeldingCheckForm">非破坏性开凿</th>
          <th className="narrowUnitStyleInWeldingCheckForm">其它</th>
          <th className="narrowUnitStyleInWeldingCheckForm">点焊</th>
          <th className="narrowUnitStyleInWeldingCheckForm">CO2焊</th>
          <th className="narrowUnitStyleInWeldingCheckForm">钎焊</th>
          <th className="narrowUnitStyleInWeldingCheckForm">其它</th>
          <th>整改措施及期限</th>
          <th>整改人</th>
          <th>问题单</th>
        </tr>
      </thead>
    )
  }
}
