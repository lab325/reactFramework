import React, { Component } from "react";

import UploadRectifiedImage from "../../../publicComponents/uploadRectifiedImage";

import "../gluingFormStyle.less";
import "../../../style/index.less";

export default class ModificationFormOfEditing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rectification_photograph: null
    }
  }

  render() {
    const { rectification_photograph } = this.state;
    return (
      <table className={"ModificationFormOfReading"}>
        <thead><tr><th className={"tableTitle"} colSpan={4}>涂胶整改单</th></tr></thead>
        <tbody>
        <tr>
          <td>整改人</td>
          <td></td>
          <td rowSpan={3}>备注</td>
          <td rowSpan={3}>
            <textarea className={"textareaInForm"}/>
          </td>
        </tr>
        <tr>
          <td>整改人工号</td>
          <td />
        </tr>
        <tr>
          <td>整改反馈时间</td>
          <td/>
        </tr>
        <tr>
          <td>跟踪车号</td>
          <td><input /></td>
          <td>涂胶编号</td>
          <td/>
        </tr>
        <tr>
          <td colSpan={2}>参数名</td>
          <td>修改参数</td>
          <td>当前参数</td>
        </tr>
        <tr>
          <td colSpan={2}>属性</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td colSpan={2}>胶水编号</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td colSpan={2}>胶水型号</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td colSpan={2}>胶水类型</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td rowSpan={2}>连接件</td>
          <td>part1</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td>part2</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td rowSpan={2}>实际胶水覆盖要求</td>
          <td>长度</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td>涂胶直径</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td rowSpan={2}>图纸胶水覆盖要求</td>
          <td>长度</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td>面积</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td colSpan={2}>涂胶特性(是否 D 特性)</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td colSpan={2}>TLD 号</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td colSpan={2}>胶水适用温度</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td colSpan={2}>TZ 图纸号</td>
          <td><input /></td>
          <td className={"currentParamsTd"}/>
        </tr>
        <tr>
          <td colSpan={2}>整改前照片</td>
          <td colSpan={2}>整改后照片</td>
        </tr>
        <tr>
          <td colSpan={2} style={{height: '12rem'}}></td>
          <td colSpan={2} style={{height: '12rem'}}>
            <UploadRectifiedImage me={this} rectification_photograph={rectification_photograph}/>
          </td>
        </tr>
        </tbody>
      </table>
    )
  }
}
