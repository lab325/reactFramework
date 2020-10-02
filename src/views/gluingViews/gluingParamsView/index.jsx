import React, { Component } from "react";
import {Button, Checkbox, Input, Menu, Select} from "antd";

import {Model} from "../../../dataModule/testBone";
import { handleChange } from '../../../publicFunction'

import './style.less'
import '../../weldingViews/weldingParamsView/style.less'
import '../../../components/publicViews/publicStyleInViews.less';
import AntdTable from "../../../publicComponents/antdTable";
import history from "../../../components/common/history";

const { SubMenu } = Menu;
const model = new Model();
const { Option } = Select;

const plainOptions = [
  '普通涂胶',
  '膨胀泡沫',
  'PV2047/2052',
  'PV2049',
  '支撑胶',
  '折边胶',
  '密封胶',
  '强度胶'
];

const columns = [
  {
    title: '胶水编号',
    dataIndex: 'gluing_code',
    key: 'gluing_code',
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
    title: '胶水型号',
    dataIndex: 'gluing_model',
    key: 'gluing_model',
  }, {
    title: '胶水类型',
    dataIndex: 'gluing_type',
    key: 'gluing_type',
  }, {
    title: '属性',
    dataIndex: 'property1',
    key: 'property1',
  }
  // , {
  //   title: '涂胶特性（是否D特性）',
  //   dataIndex: 'gluing_character',
  //   key: 'gluing_character',
  // }, {
  //   title: 'TLD 号',
  //   dataIndex: 'TLD_code',
  //   key: 'TLD_code',
  // }, {
  //   title: 'TZ 图纸号',
  //   dataIndex: 'TZ_drawing_code',
  //   key: 'TZ_drawing_code',
  // }
];

const propertyList = [
  '自动',
  '人工'
];

export default class gluingParamsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workshopSectionList: [],
      workStation: {},
      selectedWorkStation: null,
      selectedWorkshop: null,
      selectedTechnologyTypes: [],
      gluingCode: null,
      gluingModel: null,
      property1: null,
      gluingParamsIsLoading: true,
    };
    this.handleChange = handleChange.bind(this)
  }

  componentDidMount() {
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
          workStation[i] = response.data;
          me.setState({ workStation: workStation })
        })
      }
    })
  };

  workshopSectionClick = (aim) => {
    this.setState({
      selectedWorkStation: null,
      selectedWorkshop: aim
    });
    this.searchParamsAndToFirstPage(aim, null)
  };

  workStationClick = (aim, workshopSection) => {
    this.setState({
      selectedWorkStation: aim,
      selectedWorkshop: workshopSection
    });
    this.searchParamsAndToFirstPage(workshopSection, aim)
  };

  showWorkStation = (workStationList, workshopSection) => {
    if (workStationList) {
      return workStationList.map((item) => {
        return <Menu.Item key={item + workshopSection} onClick={() => this.workStationClick(item, workshopSection)}>{item}</Menu.Item>
      })
    } else return null
  };

  checkBoxOnChange = (checkedValues) => {
    this.setState({
      selectedTechnologyTypes: checkedValues
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

  searchParamsAndToFirstPage = (selectedWorkshop, selectedWorkStation) => {
    const {
      selectedTechnologyTypes,
      gluingCode,
      gluingModel,
      property1,
    } = this.state;
    const queryParams = {
      workshop: selectedWorkshop,
      workStation: selectedWorkStation,
      gluingCode: gluingCode,
      gluingModel: gluingModel,
      property1: property1,
      selectedTechnologyTypes: selectedTechnologyTypes
    };
    this.setDataList({
      ...queryParams,
      pageSize: 10,
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
      gluingCode: null,
      gluingModel: null,
      property1: null,
      selectedTechnologyTypes: []
    });
    this.setDataList({
      workshop: selectedWorkshop,
      workStation: selectedWorkStation,
      gluingCode: null,
      gluingModel: null,
      property1: null,
      selectedTechnologyTypes: [],
      pageSize: 10,
      currentPage: 1
    });
    this.changeCurrentPageToOne();
  };

  onRef = (ref) => {
    if (ref !== undefined) {
      this.setDataList = ref.setDataList;
      this.changeCurrentPageToOne = ref.changeCurrentPageToOne
    }
  };

  rowClick = (record) => {
    history.push(`/technology-system/params/gluing/detail/${record._id}`);
  };

  render() {
    const {
      workshopSectionList,
      workStation,
      selectedWorkshop,
      selectedWorkStation,
      selectedTechnologyTypes,
      gluingCode,
      gluingModel,
      property1,
      gluingParamsIsLoading,
    } = this.state;
    const queryParams = {
      workshop: selectedWorkshop,
      workStation: selectedWorkStation,
      gluingCode: gluingCode,
      gluingModel: gluingModel,
      property1: property1,
      selectedTechnologyTypes: selectedTechnologyTypes
    };

    return (
      <div className={"gluingParamsView"}>
        <span className="titleOfViews">涂胶工艺参数</span>
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
                <Checkbox.Group options={plainOptions} value={selectedTechnologyTypes} onChange={this.checkBoxOnChange} />
              </div>
              <div className="searchRow">
                <div className="searchItem">
                  <span>胶水编号：</span>
                  <Input style={{ width: "68%" }} value={gluingCode} onChange={(e) => this.handleChange(e.target.value, 'gluingCode', this)} allowClear/>
                </div>
                <div className="searchItem">
                  <span>胶水型号：</span>
                  <Input style={{ width: "68%" }} value={gluingModel} onChange={(e) => this.handleChange(e.target.value, 'gluingModel', this)} allowClear/>
                </div>
                <div className="searchItem">
                  <span>属&ensp;&ensp;性：</span>
                  <Select value={property1} style={{ width: "68%" }} onChange={(value) => this.handleChange(value, 'property1', this)} allowClear>
                    {this.renderOptions(propertyList, false)}
                  </Select>
                </div>
                <Button
                  type="primary"
                  style={{marginRight: '.4rem'}}
                  onClick={() => {
                    this.setDataList({...queryParams, pageSize: 10, currentPage: 1});
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
                loading={gluingParamsIsLoading}
                url={'gluingJson/gluingJson.json'}
                rowClick={this.rowClick}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
