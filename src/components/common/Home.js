/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:01:35
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-01 19:16:18
 */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { getCookie } from '../../helpers/cookies'

export default class Home extends Component {
    render() {
      const loginComponent = <Redirect to='/login' />
      const appComponent = <Redirect to='/app' />

      return (
            getCookie('mspa_user') === null ? loginComponent : appComponent
        )
    }
}
