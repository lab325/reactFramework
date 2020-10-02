import React, { Component } from "react";
import {Select, Radio, Icon, Button, message} from "antd";

import { Model } from '../../../dataModule/testBone';
import PutIssue from '../../../components/publicViews/putIssue/index'

import '../../weldingViews/weldingCheckView/style.less';
import './style.less'

const { Option } = Select;
const model = new Model();

export default class CheckForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      technologyType: null,
      vehicleType: null,
      checkResult: null,
      checkReport: null,
      checkRecord: [],

      documentName: '',
      vehicleTypeList: [],
      vehicleTypeListIsLoading: true,
      changeShownComponent: 'checkForm'
    }
  }

  componentDidMount() {
    this.setVehicleTypeList()
  }

  setVehicleTypeList = () => {
    const me = this;
    model.fetch({}, 'vehicleType.json', 'get', function(response) {
      me.setState({
        vehicleTypeListIsLoading: false,
        vehicleTypeList: response.data
      })
    })
  };

  // 通用信息变更方法
  handleChange = (value, type) => {
    if (value === undefined || value === '') value = null;
    const checkForm = this.state;
    checkForm[type] = value;
    this.setState(checkForm);
  };

  clickInput = (id) => {
    const documentInput = document.querySelector(id);
    documentInput.click()
  };

  selectFile = (id, whetherRecordTable, index) => {
    const me = this;
    const documentInput = document.querySelector(id);
    if (documentInput.files[0] === undefined) return;
    const uploadedDocument = documentInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadedDocument);
    reader.onload = function() {
      const base64Str = this.result;
      if (whetherRecordTable === true) {
        me.changeCheckRecordPhotography(index, documentInput.files[0].name, base64Str);
        return;
      }
      me.setState({
        checkReport: base64Str,
        documentName: documentInput.files[0].name
      })
    }
  };

  clearFile = () => {
    this.setState({
      documentName: '',
      checkReport: null
    })
  };

  addOneCheckRecord = () => {
    const checkRecord = this.state.checkRecord;
    checkRecord.push({
      gluingCode: '',
      defectDescription: '',
      photography: null,
      photographyName: '',
    });
    this.setState({checkRecord: checkRecord})
  };

  changeCheckRecord = (value, type, index) => {
    const checkRecord = this.state.checkRecord;
    checkRecord[index][type] = value;
    this.setState({ checkRecord: checkRecord });
  };

  changeCheckRecordPhotography = (index, documentName, docStr) => {
    const checkRecord = this.state.checkRecord;
    const oneCheckRecord = checkRecord[index];
    oneCheckRecord.photography = docStr;
    oneCheckRecord.photographyName = documentName;
    this.setState({checkRecord: checkRecord})
  };

  clearCheckRecordPhotography = (index) => {
    const checkRecord = this.state.checkRecord;
    const oneCheckRecord = checkRecord[index];
    oneCheckRecord.photography = null;
    oneCheckRecord.photographyName = '';
    this.setState({checkRecord: checkRecord})
  };

  deleteRecord = (index) => {
    const checkRecord = this.state.checkRecord;
    checkRecord.splice(index, 1);
    this.setState({ checkRecord: checkRecord })
  };

  gluingCheckSubmit = () => {
    const checkList = ['technologyType', 'vehicleType', 'checkResult', 'checkReport'];
    const { checkResult } = this.state;
    const checkForm = this.state;
    for (let i = 0; i < checkList.length; i++) {
      if (checkForm[checkList[i]] === null) {
        message.error('检验表未填写完整！');
        return
      }
    }
    if (checkResult === 'N.i.o') {
      this.setState({ changeShownComponent: 'issueForm' })
    }
  };

  submitIssueForm = () => {
    this.setState({
      changeShownComponent: 'checkForm',
      technologyType: null,
      vehicleType: null,
      checkResult: null,
      checkReport: null,
      checkRecord: [],
      documentName: '',
    })
  };

  render() {
    const {
      technologyType,
      vehicleType,
      vehicleTypeList,
      vehicleTypeListIsLoading,
      checkResult,
      documentName,
      checkRecord,
      changeShownComponent
    } = this.state;

    const issueFormComponent =
      <PutIssue
        whetherNeedTitle={false}
        SubmitHandle={this.submitIssueForm}
        // workStation={workStation}
        // workshop={workshop}
        marginTop={0}
      />;

    const checkFormComponent =
      <div>
        <div className="weldingCheckForm" style={{marginBottom: 0}}>
          <div className="weldingCheckFormLeft">
            <div><span>工艺类型：</span></div>
            <div><span>车型：</span></div>
            <div><span>上传报告：</span></div>
            <div><span>检验结果：</span></div>
            <div><span>缺陷记录：</span></div>
          </div>
          <div className="weldingCheckFormRight">
            <Select
              className="formItem"
              onChange={(value) => this.handleChange(value, 'technologyType')}
              value={technologyType}
              allowClear
            >
              <Option value={'普通涂胶'}>普通涂胶</Option>
              <Option value={'膨胀泡沫'}>膨胀泡沫</Option>
              <Option value={'PV2047/2052'}>PV2047/2052</Option>
              <Option value={'PV2049'}>PV2049</Option>
              <Option value={'支撑胶'}>支撑胶</Option>
              <Option value={'折边胶'}>折边胶</Option>
              <Option value={'密封胶'}>密封胶</Option>
              <Option value={'强度胶'}>强度胶</Option>
            </Select>
            <Select
              className="formItem"
              onChange={(value) => this.handleChange(value, 'vehicleType')}
              value={vehicleType}
              allowClear
            >
              { vehicleTypeListIsLoading === true
                ? <Option value="disabled" disabled>加载中……</Option>
                : vehicleTypeList.map((item, index) => {
                  return <Option value={item} key={index}>{item}</Option>
                })}
            </Select>
            <div className={"formItem uploadReport"}>
              <input
                type="text"
                className="avatval"
                id="avatval"
                value={documentName}
                placeholder={"请选择文件···"}
                readOnly="readonly"
                onClick={() => this.clickInput('#avatar')}
                onChange={null}
              />
              <input
                type="file"
                className="avatar"
                name="avatar"
                id="avatar"
                onChange={() => this.selectFile('#avatar')}
              />
              <Icon
                type="close-circle"
                theme="filled"
                className={"closeIcon"}
                onClick={() => this.clearFile()}
              />
            </div>
            <Radio.Group
              className="formItem"
              style={{height: 32, lineHeight: '32px'}}
              onChange={(e) => this.handleChange(e.target.value, 'checkResult')}
              value={checkResult}
            >
              <Radio value={'i.o'}>i.o</Radio>
              <Radio value={'b.i.o'}>b.i.o</Radio>
              <Radio value={'N.i.o'}>N.i.o</Radio>
            </Radio.Group>
            <div className="createRow formItem">
              <span onClick={() => {this.addOneCheckRecord()}}>新增行</span>
              <Icon type="plus" className={"plusIcon"}/>
            </div>
          </div>
          <div style={{clear: 'both'}} />
        </div>
        <table className={"checkRecordTable"}>
          <thead>
          <tr>
            <th>序号</th>
            <th>涂胶编号</th>
            <th width={"36%"}>缺陷描述</th>
            <th>上传照片</th>
            <th width={"8%"}>操作</th>
          </tr>
          </thead>
          <tbody>
          {
            checkRecord.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{ index + 1 }</td>
                  <td><input className={"textInput"} onChange={(e) => this.changeCheckRecord(e.target.value, 'gluingCode', index)} value={item['gluingCode']}/></td>
                  <td><input className={"textInput"} onChange={(e) => this.changeCheckRecord(e.target.value, 'defectDescription', index)} value={item['defectDescription']}/></td>
                  <td>
                    <div className={"uploadReport"}>
                      <input
                        className="avatval"
                        type="text"
                        // value={documentName}
                        placeholder={"请选择文件···"}
                        readOnly="readonly"
                        value={item.photographyName}
                        onClick={() => this.clickInput("#avatar" + index)}
                        onChange={null}
                      />
                      <input
                        className="avatar"
                        type="file"
                        name="avatar"
                        id={"avatar" + index}
                        accept="image/*"
                        onChange={() => this.selectFile('#avatar' + index, true, index)}
                      />
                      <Icon
                        type="close-circle"
                        theme="filled"
                        className={"closeIcon"}
                        onClick={() => this.clearCheckRecordPhotography(index)}
                      />
                      {/*<a href="#" id="avatsel1">选择文件</a>*/}
                    </div>
                  </td>
                  <td><Icon type="delete" theme="filled" style={{color: 'red'}} onClick={() => this.deleteRecord(index)}/></td>
                </tr>
              )
            })
          }
          {
            checkRecord.length === 0
              ? <tr>
                <td style={{height: '1rem'}}/>
                <td style={{height: '1rem'}}/>
                <td style={{height: '1rem'}}/>
                <td style={{height: '1rem'}}/>
                <td style={{height: '1rem'}}/>
              </tr>
              : null
          }
          </tbody>
        </table>
        <Button
          type={"primary"}
          className={"submitInGluingCheck"}
          onClick={() => this.gluingCheckSubmit()}
        >提交</Button>
      </div>;

    return (
      <div style={{marginTop: 48}}>
        { changeShownComponent === 'checkForm' ? checkFormComponent : null }
        { changeShownComponent === 'issueForm' ? issueFormComponent : null }
      </div>
    )
  }
}
