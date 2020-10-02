import React, { Component } from 'react';
import { connect } from 'react-redux';

import ForRectifier from '../../forms/publicForm/artificialIssueForm/forRectifier';
import ModificationFormOfEditing from '../../forms/gluing/modificationFormOfEditing';

import { Model } from '../../dataModule/testBone'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weldingList: [],
      gluingList: [],
      fixtureList: [],
      supervised_torque_2_angle: null,
      vehicle_type: '',
      welding_issue_form: null,
      welding_modification_form: null,
      approvingForm: null,
      weldingCheckForm: null
    }
  }

  componentDidMount() {
    const model = new Model()
    model.fetch({}, 'approvingForm.json', 'get', this.setApprovingForm)

    model.fetch({}, 'weldingJson/weldingJson.json', 'get', this.setNewData)
    model.fetch({}, 'weldingJson/weldingIssueForm.json', 'get', this.setWeldingIssueForm)
    model.fetch({}, 'weldingJson/weldingModificationForm.json', 'get', this.setWeldingModificationForm)
    model.fetch({}, 'weldingJson/weldingCheckForm.json', 'get', this.setWeldingCheckForm)

    model.fetch({}, 'gluingJson.json', 'get', this.setGluingData)

    model.fetch({}, 'fixtureJson.json', 'get', this.setFixtureData)
  }

  setWeldingCheckForm = (response) => {
    this.setState({
      weldingCheckForm: response.data
    })
  }

  setApprovingForm = (response) => {
    this.setState({
      approvingForm: response.data
    })
  }

  setWeldingModificationForm = (response) => {
    this.setState({
      welding_modification_form: response.data
    })
  }

  setWeldingIssueForm = (response) => {
    this.setState({
      welding_issue_form: response.data
    })
  }

  setNewData = (response) => {
    this.setState({
      weldingList: response.data
    })
  }

  setGluingData = (response) => {
    this.setState({
      gluingList: response.data
    })
  }

  setFixtureData = (response) => {
    this.setState({
      fixtureList: response.data.dataList,
      supervised_torque_2_angle: response.data.supervised_torque_2_angle,
      vehicle_type: response.data.vehicle_type
    })
  }

  render() {
    const {
      weldingList,
      gluingList,
      fixtureList,
      supervised_torque_2_angle,
      vehicle_type,
      welding_issue_form,
      welding_modification_form,
      approvingForm,
      weldingCheckForm
    } = this.state
    if (
      weldingList.length === 0 ||
      gluingList.length === 0 ||
      fixtureList.length === 0 ||
      welding_issue_form === null ||
      welding_modification_form === null ||
      approvingForm === null ||
      weldingCheckForm === null
    ) return null
    return (
      <div style={{overflowX: 'auto', marginTop: 60}}>
        {/*<ForRectifier />*/}
        {/*<ModificationFormOfEditing />*/}
        {/*<WeldingTechDetailForm dataList={weldingList}/>*/}
        {/*<GluingTechDetailForm dataList={gluingList}/>*/}
        {/*<FixtureTechDetailForm*/}
        {/*  dataList={fixtureList}*/}
        {/*  supervised_torque_2_angle={supervised_torque_2_angle}*/}
        {/*  vehicle_type={vehicle_type}*/}
        {/*/>*/}
        {/*<IssueFormOfReading welding_issue_form={welding_issue_form}/>*/}
        {/*<ModificationFormOfEditing*/}
        {/*  originalParams={weldingList[0]}*/}
        {/*  currentParams={weldingList[0]}*/}
        {/*  modificationParams={welding_modification_form}*/}
        {/*/>*/}
        {/*<ApprovedFormOfEditing approvingForm={approvingForm}/>*/}
        {/*<WeldingCheckFormForChecker weldingCheckForm={weldingCheckForm}/>*/}
        {/*<WeldingCheckFormForRectifier weldingCheckForm={weldingCheckForm}/>*/}
        {/*<PutIssue />*/}
        {/*<WeldingCheckView />*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        // dataModule: state.get('dataModule').get('dataModule').toJS(),
    }
}

export default connect(mapStateToProps, null)(Index);
