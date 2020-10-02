import React, { Component } from 'react'
import { Input, Select, DatePicker, TimePicker, Radio, Steps, Button, message } from "antd"

import localeDate from 'antd/es/date-picker/locale/zh_CN';
import localeTime from 'antd/es/time-picker/locale/zh_CN';
import { basicWeldingQC, WeldingQC } from '../../../dataModule/UrlList'
import { getUserName } from '../../../publicFunction'
import { Model } from '../../../dataModule/testBone'
import PutIssue from '../../../components/publicViews/putIssue/index'
import WeldingCheckFormForChecker from '../../../forms/welding/checkingForm/WeldingCheckFormForChecker'

import '../../../components/publicViews/publicStyleInViews.less'
import './style.less'

const { Option } = Select;
const { Step } = Steps;
const model = new Model()

// 问题单中的数据
const neededItems = [
  'vehicle_type',
  'workshop_section',
  'work_station',
  'part_name',
  'partno',
  'issue_type',
  'defect_type',
  'technology_code',
  'rectifier',
  'reviewer'
]

// 检验单中的数据
const aimList = [
  'workshop',
  'work_station',
  'check_result',
  'QRK_code',
  'selectedDate',
  'selectedTime',
  'shifts',
  'technology_type'
]

export default class WeldingCheckView extends Component{
  constructor(props) {
    super(props)
    this.state = {
      basicWeldingFormIsSubmitting: false,
      weldingFormIsSubmitting: false,
      check_id: '',
      // changeShownComponent: 'editCheckForm',
      changeShownComponent: 'checkForm',
      // 工段是否在加载
      workshopListLoading: true,
      // 工段列表
      workshopList: [],
      // 被选中的工段
      workshop: null,
      // 以下均为工位
      workStationListLoading: true,
      workStationList: [],
      work_station: null,
      // 检验结果
      check_result: null,
      // QRK 编号
      QRK_code: null,
      selectedDate: null,
      selectedDateStr: null,
      selectedTime: null,
      selectedTimeStr: null,
      stepCurrent: 0,
      issueForm: null,
      shifts: null,
      technology_type: null
    }
  }

  componentDidMount() {
    model.fetch({}, 'workshop/workshop.json', 'get', this.setWorkshop)
  }

  // 请求获取工段信息
  setWorkshop = (response) => {
    this.setState({
      workshopListLoading: false,
      workshopList: response.data
    })
  }
  // 请求获取工位信息
  setWorkStation = (response) => {
    this.setState({
      workStationListLoading: false,
      workStationList: response.data
    })
  }

  // 通用信息变更方法
  handleChange = (value, type) => {
    if (value === undefined || value === '') value = null
    const checkForm = this.state
    checkForm[type] = value
    this.setState(checkForm)
    if (type === 'workshop' && value !== null) {
      model.fetch({}, 'workshop/workStation.json', 'get', this.setWorkStation)
    } else if (type === 'workshop' && value === null) {
      this.setState({
        workStationListLoading: true,
        work_station: null
      })
    }
  }

  // 通用时间变更方法
  timePickerOnChange = (time, timeString, type) => {
    const checkForm = this.state
    if (timeString === '') timeString = null
    if (type === 'selectedDate') {
      checkForm[type] = time
      checkForm['selectedDateStr'] = timeString
    } else if (type === 'selectedTime') {
      checkForm[type] = time
      checkForm['selectedTimeStr'] = timeString
    }
    this.setState(checkForm)
  }

  // 检验单提交事件
  submitCheckForm = () => {
    const { check_result } = this.state
    const checkForm = this.state
    const neededCheckForm = {}
    for (let i = 0; i < aimList.length; i++) {
      if (checkForm[aimList[i]] === null) {
        message.error('检验表未填写完整！')
        return
      }
      neededCheckForm[aimList[i]] = checkForm[aimList[i]]
    }
    this.postBasicCheckForm(neededCheckForm, check_result)
  }

  // 问题单提交事件
  submitIssueForm = (issueForm, step,) => {
    if (step === 1) {
      let neededIssueForm = {}
      for (let i = 0; i < neededItems.length; i++) {
        neededIssueForm[neededItems[i]] = issueForm[neededItems[i]]
      }
      neededIssueForm.robot = issueForm.robot
      neededIssueForm.imgBase64 = issueForm.imgBase64
      neededIssueForm.check_id = this.state.check_id
      return neededIssueForm
    } else {
      this.setState({
        issueForm: issueForm,
        changeShownComponent: 'editCheckForm',
        stepCurrent: 2
      })
    }
  }

  submitWeldingCheckFormItems = (defectTypeList, reworkTypeList, checkForm) => {
    const { weldingFormIsSubmitting } = this.state
    this.setState({
      weldingFormIsSubmitting: true
    })
    if (weldingFormIsSubmitting === true) {
      message.warning('正在提交，请稍后')
      return
    }
    const me = this
    checkForm.defect_type_list = JSON.stringify(defectTypeList)
    checkForm.rework_type_list = JSON.stringify(reworkTypeList)
    checkForm.basic_form_id = this.state.check_id
    checkForm.issue_form_id = this.state.issueForm['_id']
    checkForm.vehicle_type = this.state.issueForm['vehicle_type']
    checkForm.rectifier_name = this.state.issueForm['rectifier']
    checkForm.rectifier_id = this.state.issueForm['rectifier']

    model.fetch(
      checkForm,
      WeldingQC,
      'post',
      function(response) {
        message.success('检验表提交完成！')
        me.clearFunction()
        me.setState({
          changeShownComponent: 'checkForm',
          stepCurrent: 0
        })
        me.setState({
          weldingFormIsSubmitting: false
        })
      },
      function(response) {
        message.warning('检验表提交失败，请重试！')
      },
      false
    )
  }

  clearFunction = () => {
    const checkForm = this.state
    for (let i = 0; i < aimList.length; i++) {
      checkForm[aimList[i]] = null
    }
    this.setState(checkForm)
  }

  postBasicCheckForm = (form, check_result) => {
    const { basicWeldingFormIsSubmitting } = this.state
    this.setState({
      basicWeldingFormIsSubmitting: true
    })
    const me = this
    form['checked_date'] = new Date(this.state.selectedDateStr + ' ' + this.state.selectedTimeStr)
    if (basicWeldingFormIsSubmitting === true) {
      message.warning('正在提交，请稍后')
      return
    }
    model.fetch(
      form,
      basicWeldingQC,
      'post',
      function(response) {
        me.clearFunction()
        if (check_result === -1) {
          me.setState({
            ...response.data,
            check_id: response.data['_id'],
            check_result: -1,
            changeShownComponent: 'issueForm',
            stepCurrent: 1
          })
        }
        message.success('检验表提交完成！')
        me.setState({
          basicWeldingFormIsSubmitting: false
        })
      },
      function(response) {
        message.warning('检验表提交失败，请重试！')
      },
      false
    )
  }

  render() {
    const {
      changeShownComponent,
      check_result,
      stepCurrent,
      workStationListLoading,
      workStationList,
      work_station,
      workshopListLoading,
      workshopList,
      workshop,
      QRK_code,
      issueForm,
      selectedTime,
      selectedTimeStr,
      selectedDate,
      selectedDateStr,
      shifts,
      technology_type
    } = this.state

    // 检验单组件
    const checkForm =
        <div className="weldingCheckForm" style={{marginTop: '10px'}}>
          <div className="weldingCheckFormLeft">
            <div><span>工段：</span></div>
            <div><span>工位：</span></div>
            <div><span>工艺类型：</span></div>
            <div><span>QRK 编号：</span></div>
            <div><span>班次：</span></div>
            <div><span>检验日期：</span></div>
            <div><span>检验时间：</span></div>
            <div><span>检验结果：</span></div>
          </div>
          <div className="weldingCheckFormRight">
            <Select
              className="formItem"
              onChange={(value) => this.handleChange(value, 'workshop')}
              value={workshop}
              allowClear
            >
              { workshopListLoading === true
                ? <Option value="disabled" disabled>加载中……</Option>
                : workshopList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })}
            </Select>
            <Select
              className="formItem"
              onChange={(value) => this.handleChange(value, 'work_station')}
              value={work_station}
              allowClear
            >
              { workStationListLoading === true
                ? <Option value="disabled" disabled>加载中……</Option>
                : workStationList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })}
            </Select>
            <Select
              className="formItem"
              onChange={(value) => this.handleChange(value, 'technology_type')}
              value={technology_type}
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
            <Input value={QRK_code} className="formItem" onChange={(e) => this.handleChange(e.target.value, 'QRK_code')}/>
            <Input value={shifts} className="formItem" onChange={(e) => this.handleChange(e.target.value, 'shifts')}/>
            <DatePicker
              className="formItem"
              onChange={(a, b) => this.timePickerOnChange(a, b, 'selectedDate')}
              value={selectedDate}
              locale={localeDate}
            />
            <TimePicker
              className="formItem"
              onChange={(a, b) => this.timePickerOnChange(a, b, 'selectedTime')}
              format={'HH:mm'}
              value={selectedTime}
              locale={localeTime}
            />
            <Radio.Group
              className="formItem"
              style={{height: 32, lineHeight: '32px'}}
              onChange={(e) => this.handleChange(e.target.value, 'check_result')}
              value={check_result}>
              <Radio value={1}>i.o</Radio>
              <Radio value={-1}>N.i.o</Radio>
            </Radio.Group>
          </div>
          <Button
            type="primary"
            style={{marginTop: '1.6rem', marginLeft: '69%'}}
            onClick={this.submitCheckForm}
          >提交</Button>
        </div>
    const issueFormComponent =
      <PutIssue
        SubmitHandle={this.submitIssueForm}
        workStation={work_station}
        workshop={workshop}
        whetherNeedTitle={false}
        marginTop={0}
      />
    const weldingCheckFormItems = { ...issueForm }
    weldingCheckFormItems.checked_date = selectedDateStr + ' ' + selectedTimeStr
    weldingCheckFormItems.checker_name = getUserName()
    if (issueForm !== null) {
      weldingCheckFormItems.defect_welding_joint_code = issueForm.technology_code
      weldingCheckFormItems.defect_work_station = issueForm.work_station
      // weldingCheckFormItems.partno = issueForm.partno
      weldingCheckFormItems.shifts = shifts
    }
    const weldingCheckForm =
      <div>
        <div style={{width: '90%', margin: '2rem auto'}}>
          <WeldingCheckFormForChecker
            whetherNeedTitle={false}
            weldingCheckForm={weldingCheckFormItems}
            clickFunction={this.submitWeldingCheckFormItems}
          />
        </div>
      </div>

    return(
      <div>
        {
          check_result === -1
            ? <Steps size="small" current={stepCurrent} style={{width: '60%', margin: '0 auto 0'}}>
                <Step title="检验" />
                <Step title="提问" />
                <Step title="检验单填写" />
              </Steps>
            : null
        }
        { changeShownComponent === 'checkForm' ? checkForm : null }
        { changeShownComponent === 'issueForm' ? issueFormComponent : null }
        { changeShownComponent === 'editCheckForm' ? weldingCheckForm : null }
      </div>
    )
  }
}
