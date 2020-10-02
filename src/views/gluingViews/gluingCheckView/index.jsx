import React, { Component } from "react";
import {Tabs} from "antd";

import CheckForm from "./checkForm";
import CheckRecords from "../../../components/publicViews/checkViews/checkRecords";
import WeldingCheckView from "../../weldingViews/weldingCheckView/WeldingCheckView";

const { TabPane } = Tabs;

export default class GluingCheckView extends Component {
  render() {
    return (
      <div style={{ marginTop: 48 }}>
        <span className="titleOfViews">涂胶检验</span>
        <Tabs defaultActiveKey="2" onChange={this.callback}>
          <TabPane tab="涂胶检验记录" key="2">
            {/* url 是获取数据的来源 */}
            <CheckRecords
              lineType={'gluing'}
              url={'weldingJson/checkList.json'}
            />
          </TabPane>
          <TabPane tab="涂胶检验" key="1">
            <CheckForm />
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
