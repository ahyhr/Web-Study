import { request } from './request'

// 获取订单数据列表
export function getOrderList(queryInfo) {
  return request({
    url: 'orders',
    params: queryInfo
  })
}

// 获取物流信息
export function getLogisticsInfo() {
  return request({
    url: "/kuaidi/1106975712662"
  })
}