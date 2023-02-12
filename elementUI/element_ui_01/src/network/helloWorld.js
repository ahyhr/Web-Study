import {request} from './request.js'

export function slideShowImg() {
  return request({
    url: '/home/multidata'
  })
}