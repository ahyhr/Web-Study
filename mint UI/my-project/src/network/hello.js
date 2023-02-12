import { request } from './request'

export function getImages() {
  return request({
    url: '/home/multidata'
  })
}