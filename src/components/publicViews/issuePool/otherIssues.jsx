import React, { Component } from "react";
import { Tabs } from "antd";

import SearchBlock from "./searchBlock";
import AntdTable from "../../../publicComponents/antdTable"
import { issueFormUrl } from "../../../dataModule/UrlList";

import './style.less';
import history from "../../common/history";

const { TabPane } = Tabs;
const columns = [
  {
    title: '问题编号',
    dataIndex: 'issue_code',
    key: 'issue_code',
  }, {
    title: '整改人',
    dataIndex: 'rectifier_name',
    key: 'rectifier_name',
  }, {
    title: '审核人',
    dataIndex: 'reviewer_name',
    key: 'reviewer_name',
  }, {
    title: '工段',
    dataIndex: 'workshop_section',
    key: 'workshop_section',
  }, {
    title: '工位',
    dataIndex: 'defect_work_station',
    key: 'defect_work_station',
  }, {
    title: '问题类型',
    dataIndex: 'issue_type',
    key: 'issue_type',
    textWrap: 'word-break',
  }, {
    title: '缺陷类型',
    dataIndex: 'defect_type',
    key: 'defect_type',
  }, {
    title: '问题发起时间',
    dataIndex: 'created_date',
    key: 'created_date',
  }, {
    title: '问题审核时间',
    dataIndex: 'reviewed_date',
    key: 'reviewed_date',
  }, {
    title: '问题终结时间',
    dataIndex: 'terminated_date',
    key: 'terminated_date',
  }
];

export default class OtherIssues extends Component{
  constructor(props) {
    super(props)
    this.specialParams = this.props.specialParams !== undefined ? this.props.specialParams : {}
    this.titleName = this.props.titleName !== undefined ? this.props.titleName : '问题池'
    this.state = {
      activeKey: '1',
      unfinishedIssuesParams: {
        dateRange: [null, null],
        vehicle_type: null,
        workshop: null,
        workStation: null,
        robot: null,
        issue_type: null,
        defect_type: null,
        issue_code: null,
        type: 'unfinishedIssuesParams',
        ...this.specialParams
      },
      finishedIssuesParams: {
        dateRange: [null, null],
        vehicle_type: null,
        workshop: null,
        workStation: null,
        robot: null,
        issue_type: null,
        defect_type: null,
        issue_code: null,
        type: 'finishedIssuesParams',
        ...this.specialParams
      },
      allIssuesParams: {
        dateRange: [null, null],
        vehicle_type: null,
        workshop: null,
        workStation: null,
        robot: null,
        issue_type: null,
        defect_type: null,
        issue_code: null,
        type: 'allIssuesParams',
        ...this.specialParams
      }
    }
  }

  componentDidMount() {
  }

  setIssuesParams = (params, type) => {
    const form = this.state;
    form[type] = {...form[type], ...params};
    this.setState(params);
    if (this.setDataList !== undefined) {
      this.setDataList({...form[type], ...params, currentPage: 1});
      this.changeCurrentPageToOne()
    }
  };

  setIssuesParams2 = (params, type) => {
    const form = this.state;
    form[type] = {...form[type], ...params};
    this.setState(params);
    if (this.setDataList2 !== undefined) {
      this.setDataList2({...form[type], ...params, currentPage: 1});
      this.changeCurrentPageToOne2()
    }
  };

  setIssuesParams3 = (params, type) => {
    const form = this.state;
    form[type] = {...form[type], ...params};
    this.setState(params);
    if (this.setDataList3 !== undefined) {
      this.setDataList3({...form[type], ...params, currentPage: 1});
      this.changeCurrentPageToOne3()
    }
  };

  onRef = (ref) => {
    if (ref !== undefined) {
      this.setDataList = ref.setDataList;
      this.changeCurrentPageToOne = ref.changeCurrentPageToOne
    }
  };

  onRef2 = (ref) => {
    if (ref !== undefined) {
      this.setDataList2 = ref.setDataList;
      this.changeCurrentPageToOne2 = ref.changeCurrentPageToOne
    }
  };

  onRef3 = (ref) => {
    if (ref !== undefined) {
      this.setDataList3 = ref.setDataList;
      this.changeCurrentPageToOne3 = ref.changeCurrentPageToOne
    }
  };

  rowClick = (record) => {
    history.push(`/technology-system/issue/issue-form-for-reader/${record.issue_type}/${record._id}`);
  };

  render() {
    const { activeKey, unfinishedIssuesParams, allIssuesParams, finishedIssuesParams } = this.state

    return(
      <div className={"otherIssues"}>
        <span className="titleOfViews">{this.titleName}</span>
        <Tabs defaultActiveKey={activeKey}>
          <TabPane tab="未完成问题" key="1">
            <SearchBlock
              searchFunction={this.setIssuesParams}
              type={'unfinishedIssuesParams'}
            />
            <AntdTable
              onRef={this.onRef}
              style={{width: '90%', marginLeft: '5%', marginTop: '1.4rem'}}
              columns={columns}
              queryParams={unfinishedIssuesParams}
              loading={true}
              url={issueFormUrl}
              rowClick={this.rowClick}
              whetherTest={false}
            />
          </TabPane>
          <TabPane tab="已完成问题" key="2">
            <SearchBlock
              searchFunction={this.setIssuesParams2}
              type={"finishedIssuesParams"}
            />
            <AntdTable
              onRef={this.onRef2}
              style={{width: '90%', marginLeft: '5%', marginTop: '1.4rem'}}
              columns={columns}
              queryParams={finishedIssuesParams}
              loading={true}
              url={issueFormUrl}
              rowClick={this.rowClick}
              whetherTest={false}
            />
          </TabPane>
          <TabPane tab="所有问题" key="3">
            <SearchBlock
              searchFunction={this.setIssuesParams3}
              type={"allIssuesParams"}
            />
            <AntdTable
              onRef={this.onRef3}
              style={{width: '90%', marginLeft: '5%', marginTop: '1.4rem'}}
              columns={columns}
              queryParams={allIssuesParams}
              loading={true}
              url={issueFormUrl}
              rowClick={this.rowClick}
              whetherTest={false}
            />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
