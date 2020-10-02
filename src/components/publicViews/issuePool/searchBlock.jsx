import React, { Component } from "react";
import {Input, Select, DatePicker, Button} from "antd";
import moment from "moment";

import {Model} from "../../../dataModule/testBone";

import "./style.less";

const { Option } = Select;
const { RangePicker } = DatePicker;
const model = new Model();
const itemInputWidth = '64%';

export default class SearchBlock extends Component{
  constructor(props) {
    super(props);
    this.state = {
      check_result: null,
      QRK: null,
      vehicleIsLoading: true,
      vehicleList: [],
      vehicle_type: null,
      workshopIsLoading: true,
      workshopList: [],
      workshop_section: null,
      workStationIsLoading: true,
      workStationList: [],
      defect_work_station: null,
      robotIsLoading: true,
      robotList: [],
      robot: null,
      issueTypeList: ['焊接人为问题', '焊接非人为问题'],
      issue_type: null,
      defectTypeIsLoading: true,
      defectTypeList: [],
      defect_type: null,
      dateRange: [null, null],
      issue_code: null
    };
    this.searchFunction = this.props.searchFunction !== undefined ? this.props.searchFunction : function() {
      console.log('this.props.searchFunction 搜索按钮点击事件')
    }
  }

  componentDidMount() {
    this.setVehicleTypeList()
    this.setWorkshopTypeList()
    // this.setWorkStationTypeList()
  }

  renderOptions = (list, loading, type) => {
    if (loading === true) {
      return <Option value="disabled" disabled>加载中……</Option>
    }
    if (type === 'workshop_section') {
      return list.map((item, index) => {
        return <Option value={item} key={index} onClick={() => {this.setWorkStationTypeList()}}>{item}</Option>
      })
    } else if (type === 'defect_work_station') {
      return list.map((item, index) => {
        return <Option value={item} key={index} onClick={() => {this.setRobotList()}}>{item}</Option>
      })
    } else if (type === 'issue_type') {
      return list.map((item, index) => {
        return <Option value={item} key={index} onClick={() => {this.setDefectTypeList()}}>{item}</Option>
      })
    }
    return list.map((item, index) => {
      return <Option value={item} key={index}>{item}</Option>
    })
  }

  setVehicleTypeList = () => {
    const me = this;
    this.setState({ vehicleIsLoading: true });
    model.fetch({}, 'vehicleType.json', 'get', function(response) {
      me.setState({ vehicleList: response.data, vehicleIsLoading: false })
    })
  };

  setWorkshopTypeList = () => {
    const me = this;
    this.setState({ workshopIsLoading: true });
    model.fetch({}, 'workshop/workshop.json', 'get', function(response) {
      me.setState({ workshopList: response.data, workshopIsLoading: false })
    })
  };

  setWorkStationTypeList = () => {
    const me = this;
    this.setState({ workStationIsLoading: true });
    model.fetch({}, 'workshop/workStation.json', 'get', function(response) {
      me.setState({ workStationList: response.data, workStationIsLoading: false })
    })
  };

  setRobotList = () => {
    const me = this;
    this.setState({ robotIsLoading: true });
    model.fetch({}, 'robot.json', 'get', function(response) {
      me.setState({ robotList: response.data, robotIsLoading: false })
    })
  };

  setDefectTypeList = () => {
    const me = this;
    this.setState({ defectTypeIsLoading: true });
    model.fetch({}, 'weldingJson/defectType.json', 'get', function(response) {
      me.setState({ defectTypeList: response.data, defectTypeIsLoading: false })
    })
  }

  handleChange = (value, type) => {
    if (value === '' || value === undefined) value = null
    const rowForm = this.state;
    rowForm[type] = value;
    this.setState(rowForm)
  };

  onChangeOfDateRange = (date, dateString) => {
    if (dateString[0] === '') dateString = [null, null]
    this.setState({dateRange: dateString})
  };

  reset = () => {
    this.setState({
      dateRange: [null, null],
      vehicle_type: null,
      workshop_section: null,
      defect_work_station: null,
      robot: null,
      issue_type: null,
      defect_type: null,
      issue_code: null,
      QRK: null,
      check_result: null
    })
    const queryParams = {
      vehicle_type: null,
      workshop_section: null,
      defect_work_station: null,
      robot: null,
      issue_type: null,
      defect_type: null,
      dateRange: [null, null],
      issue_code: null,
      QRK: null,
      check_result: null
    }
    this.searchFunction(queryParams, this.props.type)
  }

  render() {
    const {
      vehicleIsLoading,
      vehicleList,
      vehicle_type,
      workshopIsLoading,
      workshopList,
      workshop_section,
      workStationIsLoading,
      workStationList,
      defect_work_station,
      robotIsLoading,
      robotList,
      robot,
      issueTypeList,
      issue_type,
      defectTypeIsLoading,
      defectTypeList,
      defect_type,
      dateRange,
      issue_code,
      QRK,
      check_result
    } = this.state

    const { type } = this.props

    const queryParams = {
      vehicle_type: vehicle_type,
      workshop_section: workshop_section,
      defect_work_station: defect_work_station,
      robot: robot,
      issue_type: issue_type,
      defect_type: defect_type,
      dateRange: dateRange,
      issue_code: issue_code,
      QRK: QRK,
      check_result: check_result
    }

    return (
      <div className={"issueSearchBlock"}>
        <div className="searchRow">
          { type !== 'checking'
            ? <div className="searchItem">
                <span>车&emsp;&emsp;型：</span>
                <Select
                  value={vehicle_type}
                  style={{ width: itemInputWidth }}
                  onChange={(value) => this.handleChange(value, 'vehicle_type')}
                  allowClear
                >
                  { this.renderOptions(vehicleList, vehicleIsLoading, 'vehicle_type') }
                </Select>
              </div>
            : null
          }
          <div className="searchItem">
            <span>工&emsp;&emsp;段：</span>
            <Select
              value={workshop_section}
              style={{ width: itemInputWidth }}
              onChange={(value) => this.handleChange(value, 'workshop_section')}
              allowClear
            >
              { this.renderOptions(workshopList, workshopIsLoading, 'workshop_section') }
            </Select>
          </div>
          <div className="searchItem">
            <span>工&emsp;&emsp;位：</span>
            <Select
              value={defect_work_station}
              style={{ width: itemInputWidth }}
              onChange={(value) => this.handleChange(value, 'defect_work_station')}
              allowClear
            >
              { this.renderOptions(workStationList, workStationIsLoading, 'defect_work_station') }
            </Select>
          </div>
          {
            type !== 'checking'
              ? <div className="searchItem">
                  <span>机&ensp;器&ensp;人：</span>
                  <Select
                    value={robot}
                    style={{ width: itemInputWidth }}
                    onChange={(value) => this.handleChange(value, 'robot')}
                    allowClear
                  >
                    { this.renderOptions(robotList, robotIsLoading, 'robot') }
                  </Select>
                </div>
              : null
          }
          {
            type !== 'checking'
              ? <div className="searchItem">
                 <span>问题编号：</span>
                 <Input
                   value={issue_code}
                   onChange={(e) => this.handleChange(e.target.value, 'issue_code')}
                   style={{ width: itemInputWidth }}
                   allowClear
                 />
                </div>
              : null
          }
          {
            type === 'checking'
              ? <div style={{display: 'inline-block', width: '60%'}}>
                  <div className="searchItem" style={{width: '30%'}}>
                    <span>QRK：</span>
                    <Input
                      value={QRK}
                      style={{width: '80%'}}
                      onChange={(e) => this.handleChange(e.target.value, 'QRK')}
                      allowClear
                    />
                  </div>
                  <div className="searchItem" style={{width: '30%', marginLeft: '1rem'}}>
                    <span>检验结果：</span>
                    <Select
                      value={check_result}
                      style={{ width: itemInputWidth }}
                      onChange={(value) => this.handleChange(value, 'check_result')}
                      allowClear
                    >
                      <Option value={'i.o'} key={'i.o'}>i.o</Option>
                      <Option value={'N.i.o'} key={'N.i.o'}>N.i.o</Option>
                    </Select>
                  </div>
                </div>
              : null
          }
        </div>
        {
          type === 'checking'
            ? <div className="searchRow" style={{marginTop: '.8rem'}}>
                <div className="searchItem" style={{width: '44%'}}>
                  <span>检验时间：</span>
                  <RangePicker
                    style={{width: itemInputWidth}}
                    value={
                      dateRange[0] === null ? null
                        : [moment(dateRange[0], 'YYYY-MM-DD HH:mm'), moment(dateRange[1], 'YYYY-MM-DD HH:mm')]
                    }
                    onChange={this.onChangeOfDateRange}
                  />
                </div>
                <Button
                  id={this.props.searchButtonId}
                  type="primary"
                  style={{marginLeft: '.8rem', marginRight: '.8rem', width: '5rem'}}
                  onClick={() => this.searchFunction(queryParams, this.props.type)}
                >搜索</Button>
                <Button
                  style={{width: '5rem'}}
                  onClick={() => this.reset()}
                >重置</Button>
              </div>
            : null
        }
        {
          type !== 'checking'
            ? <div className="searchRow" style={{marginTop: '.8rem'}}>
                <div className="searchItem">
                  <span>问题类型：</span>
                  <Select
                    value={issue_type}
                    style={{width: itemInputWidth}}
                    onChange={(value) => this.handleChange(value, 'issue_type')}
                    allowClear
                  >
                    {this.renderOptions(issueTypeList, false, 'issue_type')}
                  </Select>
                </div>
                <div className="searchItem">
                  <span>缺陷类型：</span>
                  <Select
                    value={defect_type}
                    style={{width: itemInputWidth}}
                    onChange={(value) => this.handleChange(value, 'defect_type')}
                    allowClear
                  >
                    {this.renderOptions(defectTypeList, defectTypeIsLoading, 'defect_type')}
                  </Select>
                </div>
                <div className="searchItem" style={{width: '38%'}}>
                  <span>发起时间：</span>
                  <RangePicker
                    value={
                      dateRange[0] === null ? null
                        : [moment(dateRange[0], 'YYYY-MM-DD HH:mm'), moment(dateRange[1], 'YYYY-MM-DD HH:mm')]
                    }
                    onChange={this.onChangeOfDateRange}
                  />
                </div>
                <Button
                  id={this.props.searchButtonId}
                  type="primary"
                  style={{marginLeft: '.8rem', marginRight: '.8rem', width: '5rem'}}
                  onClick={() => this.searchFunction(queryParams, this.props.type)}
                >搜索</Button>
                <Button
                  style={{width: '5rem'}}
                  onClick={() => this.reset()}
                >重置</Button>
              </div>
            : null
        }
      </div>
    )
  }
}
