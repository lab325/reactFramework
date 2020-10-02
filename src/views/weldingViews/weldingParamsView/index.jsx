import React, { Component } from 'react';
import { Menu, Select, Input, Checkbox, Button } from 'antd';
import {connect} from 'react-redux'

import { weldingParams } from '../../../dataModule/UrlList';
import AntdTable from '../../../publicComponents/antdTable';
import history from '../../../components/common/history';
import {Model} from "../../../dataModule/testBone";
import { handleChange } from '../../../publicFunction';
import { actionCreators } from '../store';

import './style.less';
import '../../../components/publicViews/publicStyleInViews.less';

const { SubMenu } = Menu;
const { Option } = Select;
const model = new Model();

const columns = [
  {
    title: '焊点编号',
    dataIndex: 'welding_joint_code',
    key: 'welding_joint_code',
  }, {
    title: '车型',
    dataIndex: 'vehicle_type',
    key: 'vehicle_type',
  }, {
    title: '工段',
    dataIndex: 'workshop_section',
    key: 'workshop_section',
  }, {
    title: '工位',
    dataIndex: 'work_station',
    key: 'work_station',
  }, {
    title: '焊钳号',
    dataIndex: 'hawkbill_code',
    key: 'hawkbill_code',
  }, {
    title: '焊钳控制器',
    dataIndex: 'hawkbill_controller',
    key: 'hawkbill_controller',
  }, {
    title: '机器人',
    dataIndex: 'robot',
    key: 'robot',
  }
];

const plainOptions = [
  '点焊', '激光钎焊', '普通焊缝', 'FDS',
  '深熔焊', '压铆螺母', '螺柱焊', '凸焊螺母',
  '拉铆螺母', '钣金咬合'
];

class WeldingParamsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopSectionList: [],
      selectedWorkshop: null,
      workStation: {},
      selectedWorkStation: null,
      vehicleTypeList: [],
      vehicleTypeIsLoading: true,
      vehicle_type: null,
      robotList: [],
      robotIsLoading: true,
      robot: null,
      welding_joint_code: null,
      technology_type: [],
      rejectQueryInDidMount: false,
      using_status: 1
    };
    this.handleChange = handleChange.bind(this)
  }

  componentDidMount() {
    if (JSON.stringify(this.props.searchParams) !== '{}') {
      const { workshop_section, work_station } = this.props.searchParams;
      this.setState({
        ...this.props.searchParams,
        selectedWorkshop: workshop_section,
        selectedWorkStation: work_station
      })
      this.setCurrentPage(this.props.searchParams.currentPage)
      this.props.dispatchSearchParams({})
    }
    this.setVehicleTypeList();
    this.setRobotList();
    this.setWorkshopList()
  }

  setWorkshopList = () => {
    const me = this;
    model.fetch({}, 'workshop/workshop.json', 'get', function(response) {
      me.setState({
        workshopSectionList: response.data
      });
      for (let i of response.data) {
        const workStation = me.state.workStation;
        model.fetch({}, 'workshop/workStation.json', 'get', function(response) {
          const me =this;
          workStation[i] = response.data;
          me.setState({ workStation: workStation })
        })
      }
    })
  };

  setVehicleTypeList = () => {
    const me = this;
    model.fetch({}, 'vehicleType.json', 'get', function(response) {
      me.setState({
        vehicleTypeIsLoading: false,
        vehicleTypeList: response.data
      })
    })
  };

  setRobotList = () => {
    const me =this;
    model.fetch({}, 'robot.json', 'get', function(response) {
      me.setState({
        robotList: response.data,
        robotIsLoading: false
      })
    })
  };

  renderOptions = (list, loading, type) => {
    if (loading === true) {
      return <Option value="disabled" disabled>加载中……</Option>
    }
    return list.map((item, index) => {
      return <Option value={item} key={index}>{item}</Option>
    })
  };

  // 左侧工段点击事件
  workshopSectionClick = (aim) => {
    this.setState({
      selectedWorkStation: null,
      selectedWorkshop: aim
    })
    this.searchParamsAndToFirstPage(aim, null)
  };

  workStationClick = (aim, workshopSection) => {
    this.setState({
      selectedWorkStation: aim,
      selectedWorkshop: workshopSection
    })
    this.searchParamsAndToFirstPage(workshopSection, aim)
  };

  showWorkStation = (workStationList, workshopSection) => {
    if (workStationList) {
      return workStationList.map((item) => {
        return <Menu.Item key={item + workshopSection} onClick={() => this.workStationClick(item, workshopSection)}>{item}</Menu.Item>
      })
    } else return null
  };

  rowClick = (record) => {
    const {
      vehicle_type,
      welding_joint_code,
      robot,
      selectedWorkshop,
      selectedWorkStation,
      technology_type,
      using_status
    } = this.state;

    const queryParams = {
      workshop_section: selectedWorkshop,
      work_station: selectedWorkStation,
      vehicle_type,
      robot,
      welding_joint_code,
      technology_type,
      using_status
    };
    this.props.dispatchSearchParams({
      ...queryParams,
      currentPage: this.queryCurrentPage()
    });
    this.setState({
      rejectQueryInDidMount: true
    })
    history.push(`/technology-system/params/welding/detail/${record.welding_joint_code}`);
  };

  checkBoxOnChange = (checkedValues) => {
    this.setState({
      technology_type: checkedValues
    })
  };

  searchParamsAndToFirstPage = (selectedWorkshop, selectedWorkStation) => {
    const {
      technology_type,
      vehicle_type,
      robot,
      welding_joint_code,
      using_status
    } = this.state;
    const queryParams = {
      workshop_section: selectedWorkshop,
      work_station: selectedWorkStation,
      vehicle_type,
      robot,
      welding_joint_code,
      technology_type,
      using_status
    };
    this.setDataList({
      ...queryParams,
      currentPage: 1
    });
    this.changeCurrentPageToOne();
  };

  reset = () => {
    const {
      selectedWorkshop,
      selectedWorkStation,
    } = this.state;
    this.setState({
      vehicle_type: null,
      robot: null,
      welding_joint_code: null,
      technology_type: []
    });
    this.setDataList({
      workshop_section: selectedWorkshop,
      work_station: selectedWorkStation,
      vehicle_type: null,
      robot: null,
      welding_joint_code: null,
      technology_type: [],
      currentPage: 1,
      using_status: 1
    });
    this.changeCurrentPageToOne();
  };

  onRef = (ref) => {
    if (ref !== undefined) {
      this.setDataList = ref.setDataList;
      this.changeCurrentPageToOne = ref.changeCurrentPageToOne;
      this.queryCurrentPage = ref.queryCurrentPage;
      this.setCurrentPage = ref.setCurrentPage
    }
  };

  render() {
    const {
      vehicle_type,
      vehicleTypeList,
      vehicleTypeIsLoading,
      robotList,
      robotIsLoading,
      welding_joint_code,
      robot,
      workshopSectionList,
      workStation,
      selectedWorkshop,
      selectedWorkStation,
      weldingParamsIsLoading,
      technology_type,
      using_status
    } = this.state;

    let queryParams = {
      workshop_section: selectedWorkshop,
      work_station: selectedWorkStation,
      vehicle_type,
      robot,
      welding_joint_code,
      technology_type,
      using_status
    };

    if (JSON.stringify(this.props.searchParams) !== '{}') {
      queryParams = this.props.searchParams
    }

    return (
      <div style={{marginTop: 48}}>
        <span className="titleOfViews">焊接工艺参数</span>
        <div className="weldingParamsView">
          <div className="leftOfWeldingParamsView">
            <Menu mode="inline" style={{ width: 256 }}>
              {
                workshopSectionList.map((item, index) => {
                  return (
                    <SubMenu key={index} title={<span>{item}</span>} onTitleClick={() => this.workshopSectionClick(item)}>
                      {this.showWorkStation(workStation[item], item)}
                    </SubMenu>
                  )
                })
              }
            </Menu>
          </div>
          <div className="rightOfWeldingParamsView">
            <div className="workshopTitle">
              <span className="workshopTitleItem">工段：{selectedWorkshop}</span>
              <span className="workshopTitleItem">工位：{selectedWorkStation}</span>
            </div>
            <div className="searchBlock">
              <div className="searchRow checkboxBlock">
                <Checkbox.Group options={plainOptions} value={technology_type} onChange={this.checkBoxOnChange} />
              </div>
              <div className="searchRow">
                <div className="searchItem">
                  <span>车&emsp;&emsp;型：</span>
                  <Select value={vehicle_type} style={{ width: "68%" }} onChange={(value) => this.handleChange(value, 'vehicle_type', this)} allowClear>
                    {this.renderOptions(vehicleTypeList, vehicleTypeIsLoading)}
                  </Select>
                </div>
                <div className="searchItem">
                  <span>机&ensp;器&ensp;人：</span>
                  <Select value={robot} style={{ width: "68%" }} onChange={(value) => this.handleChange(value, 'robot', this)} allowClear>
                    {this.renderOptions(robotList, robotIsLoading)}
                  </Select>
                </div>
                <div className="searchItem">
                  <span>焊点编号：</span>
                  <Input style={{ width: "68%" }} value={welding_joint_code} onChange={(e) => this.handleChange(e.target.value, 'welding_joint_code', this)}/>
                </div>
                <Button
                  type="primary"
                  style={{marginRight: '.4rem'}}
                  onClick={() => {
                    this.setDataList({...queryParams, currentPage: 1});
                    this.changeCurrentPageToOne();
                  }}
                >搜索</Button>
                <Button onClick={() => this.reset()}>重置</Button>
              </div>
            </div>
            <div className="tableComponent">
              <AntdTable
                onRef={this.onRef}
                columns={columns}
                queryParams={queryParams}
                loading={weldingParamsIsLoading}
                rejectQueryInDidMount={JSON.stringify(this.props.searchParams) !== '{}'}
                // url={'weldingJson/weldingJson.json'}
                // whetherTest={true}
                rowClick={this.rowClick}
                url={weldingParams}
                whetherTest={false}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    searchParams: state.get('weldingViewsStore').get('searchParams').toJS(),
  }
};

const mapDispatchToProps=(dispatch)=>{
  return {
    dispatchSearchParams(value) {
      dispatch(actionCreators.dispatchSearchParams(value))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(WeldingParamsView);
