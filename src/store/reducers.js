/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:12:25
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-05-05 14:46:48
 */
import { combineReducers } from 'redux-immutable'
import { reducer as commonReducer } from '../components/common/store'

const reducer = combineReducers({
  commonReducer
})

export default reducer
