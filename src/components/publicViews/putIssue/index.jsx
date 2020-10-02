import React, { Component } from 'react'
import {Select, Input, Upload, Button, Icon, message} from 'antd';

import { Model } from "../../../dataModule/testBone";
import { getUserName, getUserId } from '../../../publicFunction'
import { weldingParams } from '../../../dataModule/UrlList';

import './putIssue.less'
import '../publicStyleInViews.less'

const { Option } = Select;
const { TextArea } = Input;
const model = new Model()

const neededCheckedItems = [
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

const issueFormItems = [
  ...neededCheckedItems,
  'robot',
  'remark',
  'imgBase64'
]

export default class PutIssue extends Component{
  constructor(props) {
    super(props)
    this.initialState = {
      // 图片附件，二进制文件
      imgBase64: [],
      uploadStatus: 'block',
      vehicle_type: null,
      workshop_section: this.props.workshop === undefined ? null : this.props.workshop,
      work_station: this.props.workStation === undefined ? null : this.props.workStation,
      part_name: null,
      partno: null,
      issue_type: null,
      defect_type: null,
      robot: null,
      technology_code: null,
      rectifier: null,
      reviewer: null,
      remark: null,
      workStationListLoading: true,
      work_station_list: [],
      defectTypeIsLoading: true,
      defect_type_list: [],
      robotLoading: true,
      robot_list: [],
      technologyCodeIsLoading: true,
      technology_code_list: [],
      // 整改人
      rectifierIsLoading: true,
      rectifier_list: [],
      // 审核人
      reviewerIsLoading: true,
      reviewer_list: [],
      selectDisable: this.props.workshop !== undefined,
      isSubmitting: false
    }
    this.state = {
      ...this.initialState,
      vehicle_type_list: [],
      workshop_section_list: [],
      workshopSectionIsLoading: true,
      vehicleTypeListLoading: true,
      issue_type_list: [],
      issueTypeIsLoading: true
    }
    this.SubmitHandle = this.props.SubmitHandle !== undefined ? this.props.SubmitHandle : null
  }

  componentDidMount() {
    model.fetch({}, 'vehicleType.json', 'get', this.setVehicleTypeList)
    if (this.props.workStation !== undefined) {
      this.setRobot(this.props.workStation)
      this.queryTechnologyCode(this.props.workStation)
    } else {
      model.fetch({}, 'workshop/workshop.json', 'get', this.setWorkshop)
    }
    model.fetch({}, 'issueType.json', 'get', this.setIssueType)
  }

  // 请求获取工段信息
  setWorkshop = (response) => {
    this.setState({
      workshopSectionIsLoading: false,
      workshop_section_list: response.data
    })
  }
  // 请求获取工位信息
  setWorkStation = (selectedWorkshopSection) => {
    const me = this
    model.fetch(
      {},
      'workshop/workStation.json',
      'get',
      function(response) {
        me.setState({
          workStationListLoading: false,
          work_station_list: response.data
        })
      }
    )
  }

  queryDefectType(issueType) {
    const me = this
    model.fetch({}, 'weldingJson/defectType.json', 'get', function(response) {
      me.setState({
        defect_type_list: response.data,
        defectTypeIsLoading: false
      })
    })
  }

  queryTechnologyCode() {
    const { workshop_section, work_station } = this.state
    const me = this
    model.fetch(
      {workshop_section, work_station, using_status: 1},
      weldingParams,
      'get',
      function(response) {
        me.setState({
          technology_code_list: response.data.results,
          technologyCodeIsLoading: false
        })
      },
      null,
      false
    )
  }

  queryReviewers() {
    const { issue_type } = this.state;
    if (issue_type.indexOf('非人为问题') === -1) {
      this.setState({
        reviewer_list: [getUserName() + ',' + getUserId()],
        reviewerIsLoading: false
      });
      return;
    }
    const me = this;
    model.fetch({}, 'reviewer.json', 'get', function(response) {
      me.setState({
        reviewer_list: response.data,
        reviewerIsLoading: false
      })
    })
  }

  queryRectifier() {
    const me = this
    model.fetch({}, 'rectifier.json', 'get', function(response) {
      me.setState({
        rectifier_list: response.data,
        rectifierIsLoading: false
      })
    })
  }

  setIssueType = response => {
    this.setState({
      issue_type_list: response.data,
      issueTypeIsLoading: false
    })
  }

  setRobot = selectedWorkStation => {
    const me =this
    model.fetch({}, 'robot.json', 'get', function(response) {
      me.setState({
        robot_list: response.data,
        robotLoading: false
      })
    })
  }

  setVehicleTypeList = response => {
    this.setState({
      vehicle_type_list: response.data,
      vehicleTypeListLoading: false
    })
  }

  updateImgBase64 = (data) => {
    let { imgBase64 } = this.state;
    const img_list = [...imgBase64, data];
    const uploadStatus = this.changeUploadStatus(img_list)
    this.setState({
      imgBase64: img_list,
      uploadStatus: uploadStatus
    });
  }

  changeUploadStatus = (img_list) => {
    if (img_list.length === 2) {
      return 'none'
    } else {
      return  'block'
    }
  }

  handleChange = (value, type) => {
    if (value === undefined || value === '') value = null
    if (type !== undefined && typeof type === 'string') {
      this.setState(state => {
        const newState = state
        newState[type] = value
        if (type === 'issue_type') {
          newState.defect_type = null
          newState.defectTypeIsLoading = true
          newState.rectifier = null
          newState.rectifierIsLoading = true
          newState.reviewer = null
          newState.reviewerIsLoading = true
          if (value !== null) {
            this.queryDefectType(value)
            this.queryReviewers()
            this.queryRectifier()
          }
        } else if (type === 'workshop_section') {
          newState.work_station = null
          newState.workStationListLoading = true
          if (value !== null) {
            this.setWorkStation(value)
          }
        } else if (type === 'work_station') {
          newState.technology_code = null
          newState.technologyCodeIsLoading = true
          newState.robot = null
          newState.robotLoading = true
          if (value !== null) {
            this.queryTechnologyCode(value)
            this.setRobot(value)
          }
        }
        return newState;
      });
    }
  }

  renderOptions = (list, loading, type) => {
    if (loading === true) {
      return <Option value="disabled" disabled>加载中……</Option>
    }
    if (type === 'issue_type') {
      return list.map((item, index) => {
        return <Option value={item} key={index} onClick={() => {this.queryDefectType(item)}}>{item}</Option>
      })
    }
    if (type === 'technology_code') {
      return list.map((item, index) => {
        return <Option value={item.welding_joint_code} key={index}>{item.welding_joint_code}</Option>
      })
    }
    return list.map((item, index) => {
      return <Option value={item} key={index}>{item}</Option>
    })
  };

  SubmitFunction = (checkForm) => {
    const {isSubmitting} = this.state
    this.setState({
      isSubmitting: true
    })
    const me = this
    const issueForm = {}
    if (this.SubmitHandle !== null) {
      checkForm = this.SubmitHandle(checkForm, 1)
    }
    for (let i = 0; i < neededCheckedItems.length; i++) {
      if ( checkForm === undefined ) return
      if (checkForm[neededCheckedItems[i]] === null) {
        message.error('问题表未填写完整！')
        return
      }
    }
    for (let i = 0; i < issueFormItems.length; i++) {
      issueForm[issueFormItems[i]] = checkForm[issueFormItems[i]]
    }
    issueForm.defect_work_station = checkForm.work_station
    issueForm.check_id = checkForm.check_id
    issueForm.creator_id = getUserName()
    issueForm.creator_name = getUserName()
    issueForm.rectifier_name = issueForm.rectifier.split(',')[0]
    issueForm.rectifier_id = issueForm.rectifier.split(',')[1]
    issueForm.reviewer_name = issueForm.reviewer.split(',')[0]
    issueForm.reviewer_id = issueForm.reviewer.split(',')[1]
    issueForm.status = 0
    issueForm.status = 0
    if (isSubmitting === true) {
      message.warning('正在提交，请稍后')
      return
    }
    model.fetch(
      issueForm,
      'issueTrack/issueForm/',
      'post',
      function (response) {
        message.success('提问成功！')
        const nullObject = {}
        for (let i = 0; i < issueFormItems.length; i++) {
          nullObject[issueFormItems[i]] = null
        }
        me.setState(nullObject)
        if (me.SubmitHandle !== null) {
          checkForm['_id'] = response.data['_id']
          me.SubmitHandle(checkForm, 2)
        }
        me.clearFunction()
      },
      function (response) {
        message.warning('提问失败，请重试！')
      },
      false
    )
  };

  clearFunction() {
    this.setState({ ...this.initialState })
  }

  render() {
    let {
      imgBase64,
      uploadStatus,
      vehicle_type,
      workshop_section,
      work_station,
      part_name,
      partno,
      issue_type,
      defect_type,
      robot,
      technology_code,
      rectifier,
      reviewer,
      remark,

      vehicleTypeListLoading,
      vehicle_type_list,
      workshop_section_list,
      work_station_list,
      issue_type_list,
      defect_type_list,
      robotLoading,
      robot_list,
      technology_code_list,
      rectifier_list,
      reviewer_list,
      selectDisable,

      issueTypeIsLoading,
      defectTypeIsLoading,
      technologyCodeIsLoading,
      rectifierIsLoading,
      reviewerIsLoading,
      workStationListLoading
    } = this.state;

    let marginTop = 48
    if (this.props.marginTop !== undefined) marginTop = this.props.marginTop

    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.imgBase64.indexOf(file);
          // 删除二进制中的数据
          const new_img_base64 = state.imgBase64.slice();
          new_img_base64.splice(index, 1);
          const uploadStatus = this.changeUploadStatus(new_img_base64)
          return {
            imgBase64: new_img_base64,
            uploadStatus: uploadStatus
          };
        });
      },
      beforeUpload: file => {
        let updateImgBase64 = this.updateImgBase64;
        let reader = new FileReader();
        // 异步转为二进制
        reader.readAsDataURL(file);
        reader.onload = function () {
          updateImgBase64(this.result)
        }
        return false;
      },
      imgBase64,
      accept: "image/*",
    }

    let picture_div = null
    if (imgBase64 !== null) {
      picture_div = imgBase64.map((picture, index)=> (
        <img
          key={index}
          src={picture}
          style={{width: "100%", marginTop:10, marginBottom:10}}
          alt={`第${index+1}张图片`}
        />
      ))
    }

    return (
      <div className="putIssue" style={{marginTop: marginTop, marginBottom: 10}}>
        { this.props.whetherNeedTitle === false ? null : <span className="titleOfViews">提问</span> }
        <div className="putIssueForm">
          <div className="leftOfPutIssue">
            <div className="firstItemInPutIssue">
              <div><span>车型：</span></div>
              <div><span>工段：</span></div>
              <div><span>工位：</span></div>
              <div><span>零件名称：</span></div>
              <div><span>零件号：</span></div>
              <div><span>问题类型：</span></div>
              <div><span>缺陷类型：</span></div>
              <div><span>机器人：</span></div>
              <div><span>工艺编号：</span></div>
              <div><span>审核人：</span></div>
            </div>
            <div className="secondItemInPutIssue">
              <Select
                allowClear
                value={vehicle_type}
                className="inputInSecondItemInPutIssue"
                onChange={(value) => this.handleChange(value, 'vehicle_type')}>
                {this.renderOptions(vehicle_type_list, vehicleTypeListLoading)}
              </Select>
              <Select
                disabled={selectDisable}
                allowClear
                value={workshop_section}
                className="inputInSecondItemInPutIssue"
                onChange={(value) => this.handleChange(value, 'workshop_section')}>
                {this.renderOptions(workshop_section_list)}
              </Select>
              <Select
                disabled={selectDisable}
                allowClear
                value={work_station}
                className="inputInSecondItemInPutIssue"
                onChange={(value) => this.handleChange(value, 'work_station')}>
                {this.renderOptions(work_station_list, workStationListLoading)}
              </Select>
              <Input allowClear value={part_name} onChange={(e) => this.handleChange(e.target.value, 'part_name')} className="inputInSecondItemInPutIssue" />
              <Input allowClear value={partno} onChange={(e) => this.handleChange(e.target.value, 'partno')} className="inputInSecondItemInPutIssue" />
              <Select
                allowClear
                value={issue_type}
                className="inputInSecondItemInPutIssue"
                onChange={(value) => this.handleChange(value, 'issue_type')}>
                {this.renderOptions(issue_type_list, issueTypeIsLoading, 'issue_type')}
              </Select>
              <Select
                allowClear
                value={defect_type}
                className="inputInSecondItemInPutIssue"
                onChange={(value) => this.handleChange(value, 'defect_type')}>
                {this.renderOptions(defect_type_list, defectTypeIsLoading)}
              </Select>
              <Select
                allowClear
                value={robot}
                className="inputInSecondItemInPutIssue"
                onChange={(value) => this.handleChange(value, 'robot')}>
                {this.renderOptions(robot_list, robotLoading, 'robot')}
              </Select>
              <Select
                allowClear
                value={technology_code}
                className="inputInSecondItemInPutIssue"
                onChange={(value) => this.handleChange(value, 'technology_code')}>
                {this.renderOptions(technology_code_list, technologyCodeIsLoading, 'technology_code')}
              </Select>
              <Select
                allowClear
                value={reviewer}
                className="inputInSecondItemInPutIssue"
                onChange={(value) => this.handleChange(value, 'reviewer')}>
                {this.renderOptions(reviewer_list, reviewerIsLoading)}
              </Select>
            </div>
          </div>
          <div className="rightOfPutIssue">
            <div className="firstItemInPutIssue changeStyle">
              <div><span>整改人：</span></div>
              <div><span>备注：</span></div>
              <div style={{marginTop: 58}}><span>上传图片：</span></div>
            </div>
            <div className="secondItemInPutIssue">
              <Select
                allowClear
                value={rectifier}
                className="inputInSecondItemInPutIssue"
                onChange={(value) => this.handleChange(value, 'rectifier')}>
                {this.renderOptions(rectifier_list, rectifierIsLoading)}
              </Select>
              <TextArea
                value={remark}
                rows={4}
                onChange={(e) => this.handleChange(e.target.value, 'remark')}
                style={{resize: "none", width: '120%', display: 'block', marginBottom: 10}}/>
              <div style={{fontSize:19}}>
                { picture_div }
                <Upload {...props} style={{cursor: 'pointer', display: uploadStatus}} accept="image/*">
                  <Icon type='plus'/>&nbsp;&nbsp;&nbsp;上传图片
                </Upload>
              </div>
            </div>
          </div>
          <div className="clear"/>
        </div>
        <Button
          type='primary'
          style={{marginLeft: '63%', width: '6rem'}}
          onClick={() => this.SubmitFunction(this.state)}
        >提交</Button>
      </div>
    )
  }
}
