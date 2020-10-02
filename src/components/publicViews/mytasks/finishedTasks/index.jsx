import React, { Component } from "react";

import SearchBlock from "../../issuePool/searchBlock";
import AntdTable from "../../../../publicComponents/antdTable";
import { issueFormUrl } from "../../../../dataModule/UrlList";
import history from "../../../common/history";

import "../../publicStyleInViews.less";
import "../style.less";

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

export default class FinishedTasks extends Component{
  constructor(props) {
    super(props);
    this.state = {
      issuesParams: {
        dateRange: [null, null],
        vehicleType: null,
        workshop: null,
        workStation: null,
        robot: null,
        issueType: null,
        defectType: null,
        issueCode: null,
        pageSize: 15,
        currentPage: 1,
        type: 'finishedTasks',
      }
    }
  }

  setIssuesParams = (params, type) => {
    const form = this.state;
    form[type] = {...form[type], ...params};
    this.setState(params);
    for (let i in params) {
      if (params[i] === null) {
        params[i] = ''
      }
    }
    if (this.setDataList !== undefined) {
      this.setDataList({...form[type], ...params, pageSize: 15, currentPage: 1});
      this.changeCurrentPageToOne()
    }
  };

  onRef = (ref) => {
    if (ref !== undefined) {
      this.setDataList = ref.setDataList;
      this.changeCurrentPageToOne = ref.changeCurrentPageToOne
    }
  };

  rowClick = (record) => {
    history.push(`/technology-system/issue/issue-form-for-reader/${record.issue_type}/${record._id}`);
  };

  render() {
    const { issuesParams } = this.state;

    return (
      <div className={"FinishedTasks"}>
        <span className="titleOfViews">已完成任务</span>
        <SearchBlock
          searchFunction={this.setIssuesParams}
          type={"issuesParams"}
        />
        <AntdTable
          onRef={this.onRef}
          style={{width: '90%', marginLeft: '5%', marginTop: '1.4rem'}}
          columns={columns}
          queryParams={issuesParams}
          loading={true}
          url={issueFormUrl}
          whetherTest={false}
          rowClick={this.rowClick}
        />
      </div>
    )
  }
}
