import React, {Component} from "react";
import { PageHeader, Spin } from 'antd';

import GluingTechDetailForm from "../../../forms/gluing/technologyDetailForm/index";
import {Model} from "../../../dataModule/testBone";
import history from '../../../components/common/history';
import '../../../components/publicViews/publicStyleInViews.less';

const model = new Model()

export default class GluingParamsDetailsView extends Component {
  constructor(props) {
    super(props);
    this.state = { gluingList: [] }
  }

  componentDidMount() {
    const locationParams = this.props.location.pathname.split('/');
    const paramsId = locationParams[locationParams.length - 1];
    this.queryWeldingParams(paramsId)
  }

  queryWeldingParams = (gluingId) => {
    const me = this;
    model.fetch({}, 'gluingJson/gluingJson.json', 'get', function(response) {
      me.setState({
        gluingList: response.data
      })
    })
  };

  render() {
    const { gluingList } = this.state;

    return (
      <div className={"gluingParamsDetailView"}>
        <PageHeader
          className={"pageHeader"}
          onBack={() => history.goBack()}
          title="涂胶工艺参数"
          // subTitle="This is a subtitle"
        />
        {
          gluingList.length === 0
            ? <div className={"loadingStyle"}><Spin size="small" /><Spin /><Spin size="large" /></div>
            : <div>
                <div className={"titleBlock"}>
                  <div className={"rowOfTitleBlock"}>
                    <span>工段：{gluingList[0]['workshop_section']}</span>
                    <span>工位：{gluingList[0]['work_station']}</span>
                    <span>车型：{gluingList[0]['vehicle_type']}</span>
                  </div>
                  <div className={"rowOfTitleBlock"}>
                    <span style={{float: 'left'}}>全局参数：</span>
                    <div style={{float: 'left', width: 'calc(100% - 112px)'}}>
                      <span>胶段：{gluingList[0]['gluing_section']}</span>
                      <span>涂胶温度T°：{gluingList[0]['gluing_temp']}</span>
                      <span>枪嘴直径：{gluingList[0]['gun_nozzles_calipering']}</span>
                      <span>预压力P：{gluingList[0]['pre_pressure']}</span>
                      <span>胶料流量：{gluingList[0]['flow']}</span>
                      <span>螺旋吹气Swirl：{gluingList[0]['swirl']}</span>
                    </div>
                    <div style={{clear: 'both'}} />
                  </div>
                  <div className={"rowOfTitleBlock"}>
                    <span style={{float: 'left'}}>局部参数：</span>
                    <div style={{float: 'left', width: 'calc(100% - 112px)'}}>
                      <span>预压力百分比：{gluingList[0]['PCT_pre_pressure']}</span>
                      <span>胶料流量百分比：{gluingList[0]['PCT_flow']}</span>
                      <span>螺旋吹气百分比：{gluingList[0]['PCT_swirl']}</span>
                      <span>涂胶轨迹：{gluingList[0]['track']}</span>
                      <span>胶枪与板材垂直距离d：{gluingList[0]['vertical_dimension']}</span>
                      <span>涂胶速度V：{gluingList[0]['speed']}</span>
                      <span>预开枪时间t1：{gluingList[0]['pre_start_time']}</span>
                      <span>提前关枪时间t2：{gluingList[0]['pre_closed_time']}</span>
                    </div>
                  </div>
                  <div style={{clear: 'both'}} />
                </div>
                <div style={{overflowX: 'auto', width: '92%', margin: '0 auto'}}>
                  <GluingTechDetailForm dataList={gluingList}/>
                </div>
              </div>
        }
      </div>
    )
  }
}
