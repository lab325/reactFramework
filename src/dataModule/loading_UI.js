import React, { Component } from 'react'
import { Spin } from 'antd'

class LoadingUI extends Component {
    render() {
        return (
            <div>
                <Spin size='small' />
                <Spin />
                <Spin size='large' />
            </div>
        )
    }
}

export default LoadingUI
