import React, { Component } from "react";
import {message} from "antd";

import SearchBlock from "../../issuePool/searchBlock";
import AntdTable from "../../../../publicComponents/antdTable";
import { issueFormUrl, activitiSupportUrl } from "../../../../dataModule/UrlList";
import history from "../../../common/history";
import {Model} from "../../../../dataModule/testBone";

import "../../publicStyleInViews.less";
import "../style.less";
import moment from "moment";

const model = new Model();
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
    render: (val) => {
      return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  }, {
    title: '问题审核时间',
    dataIndex: 'reviewed_date',
    key: 'reviewed_date',
    render: (val) => {
      return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  }
];

export default class UnfinishedTasks extends Component{
  constructor(props) {
    super(props);
    this.state = {
      issuesParams: {
        dateRange: [null, null],
        vehicleType: null,
        workshop: null,
        workStation: null,
        robot: null,
        issue_type: null,
        defect_type: null,
        issue_code: null,
        currentPage: 1,
        type: 'unfinishedTasks',
      }
    }
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

  onRef = (ref) => {
    if (ref !== undefined) {
      this.setDataList = ref.setDataList;
      this.changeCurrentPageToOne = ref.changeCurrentPageToOne
    }
  };

  rowClick = (record) => {
    model.fetch(
      {issue_id: record._id},
      activitiSupportUrl,
      'get',
      (res) => {
        const taskKey = res.data[0].taskKey
        switch (taskKey) {
          case 'answer':
            // 问题整改任务
            history.push(`/technology-system/issue/issue-form-for-rectifier/${record.issue_type}/${record._id}`);
            break;
          case 'result':
            // 整改审核任务
            history.push(`/technology-system/issue/issue-form-for-reviewer/${record.issue_type}/${record._id}`);
            break;
          default:
            message.error('工作流中不存在该任务或其它错误！')
            break;
        }
      },
      null,
      false
    )
  };

  render() {
    const { issuesParams } = this.state;

    return (
      <div className={"FinishedTasks"}>
        <span className="titleOfViews">未完成任务</span>
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
