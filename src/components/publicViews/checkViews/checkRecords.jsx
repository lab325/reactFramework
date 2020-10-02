import React, { Component } from "react";
import SearchBlock from "../../../components/publicViews/issuePool/searchBlock";
import AntdTable from "../../../publicComponents/antdTable";
// import {issueFormUrl} from "../../../dataModule/UrlList";
import moment from 'moment';
import history from "../../../components/common/history";

const columns = [
  {
    title: '工艺类型',
    dataIndex: 'technology_type',
    key: 'technology_type'
  }, {
    title: '检验日期',
    dataIndex: 'checked_date',
    key: 'checked_date',
    render: (val) => {
      return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : ''
    }
  }, {
    title: '工段',
    dataIndex: 'workshop',
    key: 'workshop'
  }, {
    title: '工位',
    dataIndex: 'work_station',
    key: 'work_station'
  }, {
    title: 'QRK编号',
    dataIndex: 'QRK_code',
    key: 'QRK_code'
  }, {
    title: '检验结果',
    dataIndex: 'check_result',
    key: 'check_result',
    render: (val) => {
      return val === 1 ? 'i.o' : 'N.i.o'
    }
  }
];

export default class CheckRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      issuesParams: {
        dateRange: [null, null],
        QRK_code: null,
        check_result: null,
        workshop: null,
        work_station: null,
        pageSize: 15,
        currentPage: 1
      }
    }
  }

  onRef = (ref) => {
    if (ref !== undefined) {
      this.setDataList = ref.setDataList;
      this.changeCurrentPageToOne = ref.changeCurrentPageToOne
    }
  };

  setIssuesParams = (params, type) => {
    const form = this.state;
    form[type] = {...form[type], ...params};
    for (let i in params) {
      if (params[i] === null) {
        params[i] = ''
      }
    }
    const newParams = {}
    newParams.workshop = params.workshop_section
    newParams.work_station = params.defect_work_station
    newParams.QRK_code = params.QRK
    newParams.check_result = params.check_result === 'i.o' ? 1 : -1
    if (params.check_result === '' || params.check_result === undefined) {
      newParams.check_result = ''
    }
    this.setState({issuesParams: {...newParams, pageSize: 15, currentPage: 1}});
    this.setDataList({...newParams, pageSize: 15, currentPage: 1});
    this.changeCurrentPageToOne()
  };

  rowClick = (record) => {
    history.push(`/technology-system/check/detail/${this.props.lineType}/${record._id}`);
  };

  render() {
    const { issuesParams } = this.state;

    return (
      <div>
        <SearchBlock
          searchFunction={this.setIssuesParams}
          type={"checking"}
        />
        <AntdTable
          onRef={this.onRef}
          style={{width: '90%', marginLeft: '5%', marginTop: '1.4rem'}}
          columns={columns}
          queryParams={issuesParams}
          loading={true}
          url={this.props.url}
          // url={'weldingJson/checkList.json'}
          rowClick={this.rowClick}
          whetherTest={false}
        />
      </div>
    )
  }
}
