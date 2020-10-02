import React, { Component } from "react";
import { Modal, Button } from "antd";

import jpgTest from '../../statistics/jpgTest.jpg';

export default class checkFormDetailForReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgVisible: false,
      clickedImg: null
    }
  }

  showModal = (clickedImg) => {
    this.setState({
      imgVisible: true,
      clickedImg: clickedImg
    });
  };

  handleCancel = e => {
    this.setState({
      imgVisible: false,
    });
  };

  render() {
    const { clickedImg } = this.state;
    const { gluingCheckForm } = this.props;
    const recordsList = []
    for (let i = 0; i < gluingCheckForm.gluingDefectRecord.length; i++) {
      recordsList.push(
        <tr key={gluingCheckForm.gluingDefectRecord[i]['_id'] + 'first'}>
          <td>胶水编号</td>
          <td>{gluingCheckForm.gluingDefectRecord[i]['gluing_code']}</td>
          <td rowSpan={2} colSpan={2}>
            <img className={'littleImg'} src={jpgTest} onClick={() => this.showModal(jpgTest)}/>
          </td>
        </tr>
      )
      recordsList.push(
        <tr style={{ height: '4rem' }} key={gluingCheckForm.gluingDefectRecord[i]['_id'] + 'second'}>
          <td>缺陷描述</td>
          <td>{gluingCheckForm.gluingDefectRecord[i]['defect_description']}</td>
        </tr>
      )
    }
    return (
      <div>
        <table className="gluingCheckFormForReader">
          <thead>
          <tr className="table-title">
            <th colSpan={4}>涂胶检验单</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>检验人</td>
            <td>{gluingCheckForm.checker_name}</td>
            <td>QRK 编号</td>
            <td>{gluingCheckForm.QRK_code}</td>
          </tr>
          <tr>
            <td>工艺类型</td>
            <td>{gluingCheckForm.technology_type}</td>
            <td>车型</td>
            <td>{gluingCheckForm.vehicle_type}</td>
          </tr>
          <tr>
            <td>检验报告</td>
            <td><Button type={"primary"} style={{width: '50%', height: '1.4rem'}}>下载附件</Button></td>
            <td>检验结果</td>
            <td>{gluingCheckForm.check_result}</td>
          </tr>
          <tr>
            <td>检验日期</td>
            <td>{gluingCheckForm.checked_date}</td>
            <td/>
            <td/>
          </tr>
          <tr><td colSpan={4}>缺陷记录</td></tr>
          {recordsList}
          </tbody>
        </table>
        <Modal
          title="大图展示"
          visible={this.state.imgVisible}
          onCancel={this.handleCancel}
          footer={null}
          width={'60%'}
        >
          <img className="bigImg" src={clickedImg}/>
        </Modal>
      </div>
    )
  }
}
