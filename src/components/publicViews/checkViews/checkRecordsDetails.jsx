import React, { Component } from "react";
import {PageHeader} from "antd";
import moment from 'moment';

import { basicWeldingQC, WeldingQC } from '../../../dataModule/UrlList';
import CheckFormDetailForReader from "../../../forms/gluing/checkFormDetailForReader";
import WeldingCheckFormForReader from "../../../forms/welding/checkingForm/WeldingCheckFormForReader";
import history from "../../common/history";
import {Model} from "../../../dataModule/testBone";

import '../publicStyleInViews.less';

export default class CheckRecordsDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkForm: null
    }
  }

  componentDidMount() {
    const me = this
    const model = new Model()
    const location = this.props.match.url.split('/');
    const type = location[location.length - 2];
    const id = location[location.length - 1];
    let url = '';
    switch (type) {
      case 'welding':
        model.fetch(
          {_id: id},
          basicWeldingQC,
          'get',
          function (response) {
            const basicCheckForm = response.data.results[0]
            basicCheckForm.checked_date = moment(basicCheckForm.checked_date).format('YYYY-MM-DD HH:mm:ss')
            model.fetch(
              {basic_form_id: id},
              WeldingQC,
              'get',
              function (newResponse) {
                let checkForm = newResponse.data.results[0]
                checkForm.rework_type_list = JSON.parse(checkForm.rework_type_list)
                checkForm.defect_type_list = JSON.parse(checkForm.defect_type_list)
                checkForm.workshop_section = basicCheckForm.workshop
                checkForm = {...basicCheckForm, ...checkForm}
                console.log('checkForm', checkForm)
                me.setState({
                  checkForm: checkForm
                })
              },
              null,
              false
            )
          },
          null,
          false
        )
        break;
      default:
        url = 'gluingJson/gluingCheckRecords.json';
        break;
    }
  }

  setCheckForm = (response) => {
    console.log(response.data.results[0])
    this.setState({
      checkForm: response.data.results[0]
    })
  }

  render() {
    const { checkForm } = this.state;
    const location = this.props.match.url.split('/');
    const type = location[location.length - 2];
    let formComponent
    let title = ''
    switch (type) {
      case 'welding':
        formComponent = <WeldingCheckFormForReader weldingCheckForm={checkForm}/>
        title = '焊接检验单';
        break;
      case 'gluing':
        formComponent = <CheckFormDetailForReader gluingCheckForm={checkForm}/>
        title = '涂胶检验单';
        break;
      default:
        formComponent = null
        break;
    }
    return (
      <div style={{ marginTop: 48 }}>
        <PageHeader
          className={"pageHeader"}
          onBack={() => history.goBack()}
          title={ title }
          // subTitle="This is a subtitle"
        />
        { checkForm !== null ? formComponent : null }
      </div>
    )
  }
}
