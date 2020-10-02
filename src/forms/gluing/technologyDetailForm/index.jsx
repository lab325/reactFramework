import React, {Component} from "react"
import '../gluingFormStyle.less'
import TechnologyDetailSingleLine from "./technologyDetailsSingleLine";

export default class GluingTechDetailForm extends Component{
  constructor(props) {
    super(props)
    this.clickProblemIconFunction = this.props.clickProblemIconFunction === undefined
      ? function(params) { console.log(params) }
      : this.props.clickProblemIconFunction
    this.state = {
      dataList: this.props.dataList
    }
  }

  render() {
    const { dataList } = this.state

    return (
      <table className="GluingTechDetailForm">
        <thead>
          <tr>
            <th rowSpan="2">胶水编号</th>
            <th rowSpan="2">属性(人工/自动)</th>
            <th rowSpan="2">胶水型号</th>
            <th rowSpan="2">胶水类型</th>
            <th colSpan="2">连接件</th>
            <th colSpan="2">实际胶水覆盖要求</th>
            <th colSpan="2">图纸胶水覆盖要求</th>
            <th rowSpan="2">涂胶特性(是否D特性)</th>
            <th rowSpan="2">TLD 号</th>
            <th rowSpan="2">胶水适合温度</th>
            <th rowSpan="2">TZ 图纸号</th>
            <th rowSpan="2">问题单</th>
            <th rowSpan="2">更改人</th>
            <th rowSpan="2" style={{minWidth: '6rem'}}>更改时间</th>
          </tr>
          <tr className="whiteRow">
            <th>part 1</th>
            <th>part 2</th>
            <th>长</th>
            <th>涂胶直径</th>
            <th>长度(mm)</th>
            <th>面积</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan="21" className="two-level-title">当前参数</td>
          </tr>
          <TechnologyDetailSingleLine
            clickProblemIconFunction={this.clickProblemIconFunction}
            singleLine={dataList[0]}/>
          <tr>
            <td colSpan="21" className="two-level-title">原始参数</td>
          </tr>
          <TechnologyDetailSingleLine
            clickProblemIconFunction={this.clickProblemIconFunction}
            singleLine={dataList[1]}/>
          <tr>
            <td colSpan="21" className="two-level-title">历史参数</td>
          </tr>
          {
            dataList.length > 2
              ? dataList.slice(2).map((item, index) => {
                  return <TechnologyDetailSingleLine
                    clickProblemIconFunction={this.clickProblemIconFunction}
                    key={index}
                    singleLine={item}/>
                })
              : null
          }
        </tbody>
      </table>
    )
  }
}
