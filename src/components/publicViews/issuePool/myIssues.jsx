import React, { Component } from "react";

import OtherIssues from './otherIssues'

export default class MyIssues extends Component{
  render() {
    const specialParams = {
      userCode: 1234
    }

    return(
      <OtherIssues
        titleName={"我的问题"}
        specialParams={specialParams}
      />
    )
  }
}
