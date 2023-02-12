import { request } from './request'

// 获取图标数据
export function getEchartData() {
  return request({
    url: 'reports/type/1'
  })
}