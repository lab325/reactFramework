import React, { Component } from "react";
import { PageHeader, Spin } from 'antd';

import { weldingParams, latestWeldingParams } from '../../../dataModule/UrlList';
import WeldingTechDetailForm from '../../../forms/welding/technologyDetailForm'
import history from '../../../components/common/history';
import {Model} from "../../../dataModule/testBone";

import './style.less'

const model = new Model();

export default class WeldingParamsDetailsView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      weldingList: []
    }
  }

  componentDidMount() {
    const locationParams = this.props.location.pathname.split('/');
    const paramsId = locationParams[locationParams.length - 1];
    this.queryWeldingParams(paramsId)
  }

  queryWeldingParams = (weldingId) => {
    const me = this;
    model.fetch(
      { welding_joint_code: weldingId, review_status: 1 },
      weldingParams,
      'get',
      function(response) {
        me.setState({
          weldingList: response.data.results
        })
      },
      function(response) {
        console.log(response)
      },
      false
    )
  };

  render() {
    const { weldingList } = this.state;

    return (
      <div className={"weldingParamsDetailsView"}>
        <PageHeader
          className={"pageHeader"}
          onBack={() => history.goBack()}
          title="焊接工艺参数"
          // subTitle="This is a subtitle"
        />
        {
          weldingList.length === 0
            ? <div className={"loadingStyle"}><Spin size="small" /><Spin /><Spin size="large" /></div>
            : <div className={"weldingParamsDetailsViewContent"}>
                <div className={"titleBlock"}>
                  <div className={"firstTitleRow"}>
                    <span>工段：{weldingList[0].workshop_section}</span>
                    <span>工位：{weldingList[0].work_station}</span>
                    <span>焊点编号：{weldingList[0].welding_joint_code}</span>
                  </div>
                  <div className={"secondTitleRow"}>
                    <span>焊钳号：{weldingList[0].hawkbill_code}</span>
                    <span>焊钳控制器：{weldingList[0].hawkbill_contoller}</span>
                    <span>Roboter(机器人)：{weldingList[0].robot}</span>
                    <span>IP：{weldingList[0].ip}</span>
                  </div>
                </div>
                <div style={{overflowX: 'auto', width: '92%', margin: '0 auto'}}>
                  <WeldingTechDetailForm dataList={weldingList}/>
                </div>
              </div>
        }
      </div>
    )
  }
}
