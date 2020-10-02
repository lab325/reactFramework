// 紧固件参数详情
import React, {Component} from "react"
import "./fixtureFormStyle.less"
import TechnologyDetailSingleLine from "./technologyDetailsSingleLine";

export default class FixtureTechDetailForm extends Component {
  constructor(props) {
    super(props)
    this.clickProblemIconFunction = this.props.clickProblemIconFunction === undefined
      ? function(params) { console.log(params) }
      : this.props.clickProblemIconFunction
    const  supervised_torque_2_date = this.props.dataList.length > 0 ? this.props.dataList[0].supervised_torque_2_date : {}
    this.state = {
      dataList: this.props.dataList,
      supervised_torque_2_angle: this.props.supervised_torque_2_angle,
      supervised_torque_2_date: supervised_torque_2_date,
      vehicle_type: this.props.vehicle_type
    }
    // 监控日期个数
    const dateNum = Object.keys(supervised_torque_2_date).length
    // 表单总列数
    this.totalColumnNum = 34 + dateNum
    // 监控窗口(二)总列数
    this.totalMonitorTwoColumnNum = 4 + dateNum
    // 螺栓/螺母技术参数总列数
    this.totalParamsColumnNum = 18 + dateNum
  }

  render() {
    const {
      supervised_torque_2_date,
      supervised_torque_2_angle,
      vehicle_type,
      dataList
    } = this.state

    return (
      <table className="FixtureTechDetailForm">
        <thead>
          <tr>
            <th rowSpan="4">工段</th>
            <th rowSpan="4">工位</th>
            <th rowSpan="2">车型</th>
            <th rowSpan="4">带胶水或自锁</th>
            <th rowSpan="4">描述</th>
            <th colSpan={this.totalParamsColumnNum}>螺栓/螺母技术参数</th>
            <th colSpan="3">安全等级</th>
            <th colSpan="2">预拧紧方式</th>
            <th style={{minWidth: '6rem'}}>终拧紧方式</th>
            <th style={{minWidth: '6rem'}}>应急拧紧方式</th>
            <th style={{minWidth: '6rem'}}>高精枪信息</th>
            <th rowSpan="4">问题单</th>
            <th rowSpan="4">整改人</th>
            <th rowSpan="4" style={{minWidth: '6rem'}}>整改时间</th>
          </tr>
          <tr>
            <th colSpan="3">零件号</th>
            <th rowSpan="3">Pr.Nr.</th>
            <th rowSpan="3">型号 规格(螺纹件)</th>
            <th rowSpan="3">数量</th>
            <th rowSpan="3">螺栓编号</th>
            <th rowSpan="3">拧紧方式</th>
            <th colSpan="4">监控窗口(一)</th>
            <th colSpan={this.totalMonitorTwoColumnNum}>监控窗口(二)</th>
            <th colSpan="2">PDM或图纸</th>
            <th rowSpan="3">TLD</th>
            <th rowSpan="3">Kat.A</th>
            <th rowSpan="3">Kat.B</th>
            <th rowSpan="3">预拧紧工具</th>
            <th rowSpan="3">预拧紧扭矩</th>
            <th rowSpan="3">型号</th>
            <th rowSpan="3">型号</th>
            <th rowSpan="3">IP地址</th>
          </tr>
          <tr>
            {/* 此处的车型需要根据数据进行变更 */}
            <th rowSpan="2">{vehicle_type}</th>
            <th rowSpan="2">外螺纹件</th>
            <th rowSpan="2">内螺纹件</th>
            <th rowSpan="2">被连接件</th>
            <th rowSpan="2">目标扭矩</th>
            <th rowSpan="2">监控扭矩</th>
            <th rowSpan="2">监控角度</th>
            <th rowSpan="2" style={{minWidth: '6rem'}}>更改日期</th>
            <th rowSpan="2">目标扭矩/角度</th>
            {
              supervised_torque_2_angle.map((item, index) => {
                return <th rowSpan="2" style={{minWidth: '4rem'}} key={index}>{item}</th>
              })
            }
            {
              Object.keys(supervised_torque_2_date).map((item, index) => {
                return <th rowSpan="2" key={index}>{item}</th>
              })
            }
            <th rowSpan="2" style={{minWidth: '6rem'}}>更改日期</th>
            <th rowSpan="2">编号/页码</th>
            <th rowSpan="2">日期</th>
          </tr>
        </thead>
        <tbody>
        <tr><td colSpan={this.totalColumnNum} className="two-level-title">当前参数</td></tr>
        <TechnologyDetailSingleLine
          clickProblemIconFunction={this.clickProblemIconFunction}
          singleLine={dataList[0]}/>
        <tr><td colSpan={this.totalColumnNum} className="two-level-title">原始参数</td></tr>
        <TechnologyDetailSingleLine
          clickProblemIconFunction={this.clickProblemIconFunction}
          singleLine={dataList[1]}/>
        <tr><td colSpan={this.totalColumnNum} className="two-level-title">历史参数</td></tr>
        {
          dataList.length > 2
            ? dataList.slice(2).map((item, index) => {
              return <TechnologyDetailSingleLine
                clickProblemIconFunction={this.clickProblemIconFunction}
                key={index}
                singleLine={item}/>
            })
            : null
        }
        </tbody>
      </table>
    )
  }
}
