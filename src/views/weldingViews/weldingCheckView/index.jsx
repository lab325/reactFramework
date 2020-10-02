import React, { Component } from "react";
import { Tabs } from 'antd';

import WeldingCheckView from './WeldingCheckView';
import CheckRecords from '../../../components/publicViews/checkViews/checkRecords';
import { basicWeldingQC } from '../../../dataModule/UrlList';

const { TabPane } = Tabs;

export default class WeldingCheckViewIndex extends Component {
  callback = (key) => {
    console.log(key);
  }

  render() {
    return (
      <div style={{marginTop: 48}}>
        <span className="titleOfViews">焊接检验</span>
        <Tabs defaultActiveKey="2" onChange={this.callback}>
          <TabPane tab="焊接检验记录" key="2">
            {/* url 是获取数据的来源 */}
            <CheckRecords
              lineType={'welding'}
              url={basicWeldingQC}
            />
          </TabPane>
          <TabPane tab="焊接检验" key="1">
            <WeldingCheckView />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
