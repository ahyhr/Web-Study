import { request } from "./request";

//获取分类数据
export function getCategory() {
  return request({
    url: '/category'
  })
}

//根据maitKey 获取右侧数据
export function getSubcategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

//根据miniWallkey 获取右侧详情数据
export function getSubcategoryDetail(miniWallkey) {
  return request({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
    }
  })
}

export function getGoods(type,page){
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
