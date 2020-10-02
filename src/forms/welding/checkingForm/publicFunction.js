export function showDefectType(code, type) {
  if (code === 1 && type === 'defect') {
    return 'x'
  } else if (code === 1 && type === 'rework') {
    return '√'
  } else {
    return ''
  }
}

export function clickDefectOrReworkTd(index, type, me) {
  const { defectTypeList, reworkTypeList } = me.state
  let aimList
  if (type === 'defect') {
    aimList = defectTypeList
  } else {
    aimList = reworkTypeList
  }
  let newValue = 0
  if (aimList[index] === 0) {
    newValue = 1
  }
  aimList[index] = newValue
  if (type === 'defect') {
    me.setState({ defectTypeList: aimList })
    return
  }
  me.setState({ reworkTypeList: aimList })
}

export function transformIntoArray(value, type) {
  const defectTypeList = ['存在', '裂纹', '爆穿', '凹坑', '锐边焊瘤和焊刺', '飞溅', '位置', '边界距离', '焊点间距', '焊缝间距', '非破坏性开凿', '其它']
  let itemList = ['点焊', 'CO2焊', '钎焊', '其它']
  const resultList = []
  if (type === 'defect') {
    itemList = defectTypeList
  }
  for (let i = 0; i < itemList.length; i++) {
    if (value === itemList[i]) {
      resultList.push(1)
    } else {
      resultList.push(0)
    }
  }
  return resultList
}
