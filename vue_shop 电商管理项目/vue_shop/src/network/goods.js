import { request } from './request'

// 获取商品分类列表
export function getCateList(type,pagenum,pagesize) {
  return request({
    url: 'categories',
    params: {
      type,
      pagenum,
      pagesize
    }
  })
}

// 添加商品分类
export function addCategories(data) {
  return request({
    url: 'categories',
    method: 'post',
    data : data
  })
}

// 根据ID查询分类
export function getCateBuyId(cateId) {
  return request({
    url: 'categories/' + cateId,
  })
}

// 编辑提交分类
export function editCate(cateId, cat_name) {
  return request({
    url: 'categories/' + cateId,
    method: 'put',
    data: {
      cat_name
    }
  })
}

// 删除分类
export function deleteCate(cateId, cat_name) {
  return request({
    url: 'categories/' + cateId,
    method: 'delete',
  })
}




//获取参数列表
export function getParamsList(cateId, sel) {
  return request({
    url: 'categories/' + cateId + '/attributes',
    params: {
      sel
    }
  })
}

// 添加参数
export function addParams(cateId, attr_name, attr_sel) {
  return request({
    url: 'categories/' + cateId + '/attributes',
    method: 'post',
    data: {
      attr_name,
      attr_sel
    }
  })
}

// 根据id查询参数
export function getParamBuyId(cateId, attrId, attr_sel) {
  return request({
    url: 'categories/' + cateId + '/attributes/' + attrId,
    params: {
      attr_sel
    }
  })
}

// 编辑提交参数
export function editParams(cateId, attrId, attr_name, attr_sel, attr_vals) {
  return request({
    url: 'categories/' + cateId + '/attributes/' + attrId,
    method: 'put',
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

// 删除参数
export function deleteParams(cateId, attrId) {
  return request({
    url: 'categories/' + cateId + '/attributes/' + attrId,
    method: 'delete'
  })
}



// 获取商品列表数据
export function getGoodsList(data) {
  return request({
    url: 'goods',
    params: data
  })
}

// 根据 ID 查询商品
export function getGoodsButId(goods_id) {
  return request({
    url: 'goods/' + goods_id,
  })
}

// 编辑提交商品
export function editGoods(goods_id,from) {
  return request({
    url: 'goods/' + goods_id,
    method: 'put',
    data: from
  })
}

// 删除商品
export function deleteGoodsBuyId(goods_id) {
  return request({
    url: 'goods/' + goods_id,
    method: 'delete',
  })
}

// 添加商品
export function addGoods(from) {
  return request({
    url: 'goods',
    method: 'post',
    data: from
  })
}