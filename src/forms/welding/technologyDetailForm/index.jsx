import React, { Component } from 'react'
import TechnologyDetailSingleLine from './technologyDetailSingleLine'

import {Model} from '../../../dataModule/testBone';
import {weldingParams} from '../../../dataModule/UrlList';

import "../weldingFormStyle.less"
import {message} from "antd";

const model = new Model();

export default class WeldingTechDetailForm extends Component{
  constructor(props) {
    super(props)
    this.clickProblemIconFunction = this.props.clickProblemIconFunction === undefined
      ? function(params) { console.log(params) }
      : this.props.clickProblemIconFunction
    this.state = {
      originalParams: {},
      currentParams: {}
    }
  }

  componentDidMount() {
    const { dataList } = this.props
    const aim = dataList[0]
    model.fetch(
      {welding_joint_code: aim.welding_joint_code, params_version: 1},
      weldingParams,
      'get',
      (res) => {
        this.setState({
          originalParams: res.data.results[0]
        })
      },
      (err) => {
        message.error('获取原始数据失败！')
      },
      false
    )
    model.fetch(
      {welding_joint_code: aim.welding_joint_code, using_status: 1},
      weldingParams,
      'get',
      (res) => {
        this.setState({
          currentParams: res.data.results[0]
        })
      },
      (err) => {
        message.error('获取当前数据失败！')
      },
      false
    )
  }

  render() {
    const { dataList } = this.props
    const { originalParams, currentParams } = this.state

    return (
      <table className="WeldingTechDetailForm">
        <thead>
          <tr>
            <th rowSpan="2">程序号</th>
            <th rowSpan="2">焊钳压力/KN</th>
            <th rowSpan="2">预压时间/ms</th>
            <th colSpan="3">预热</th>
            <th colSpan="2">斜坡</th>
            <th colSpan="3">第一次焊接</th>
            <th rowSpan="2">间隔时间/ms</th>
            <th colSpan="2">第二次焊接</th>
            <th rowSpan="2">保持时间/ms</th>
            <th colSpan="2">递增器</th>
            <th>UIR</th>
            <th rowSpan="2">问题单</th>
            <th rowSpan="2">更改人</th>
            <th rowSpan="2" style={{minWidth: '6rem'}}>更改时间</th>
          </tr>
          <tr className="whiteRow">
            <th>预热时间/ms</th>
            <th>预热电流/KA</th>
            <th>冷却时间/ms</th>
            <th>斜坡时间/ms</th>
            <th>起始电流/KA</th>
            <th>焊接时间/ms</th>
            <th>焊接电流/KA</th>
            <th>脉冲</th>
            <th>焊接时间/ms</th>
            <th>焊接电流/KA</th>
            <th>焊点数</th>
            <th>递增电流</th>
            <th>开/关</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="21" className="two-level-title">当前参数</td>
          </tr>
          <TechnologyDetailSingleLine
            clickProblemIconFunction={this.clickProblemIconFunction}
            singleLine={currentParams}/>
          <tr>
            <td colSpan="21" className="two-level-title">原始参数</td>
          </tr>
          <TechnologyDetailSingleLine
            clickProblemIconFunction={this.clickProblemIconFunction}
            singleLine={originalParams}/>
          <tr>
            <td colSpan="21" className="two-level-title">历史参数</td>
          </tr>
          {
            dataList.length !== 0
              ? dataList.map((item, index) => {
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
