import { request } from './request'

//获取用户列表
export function getUserList(data) {
  return request({
    url: 'users',
    params: data
  })
}

// 更改用户状态
export function userStateChanged(id, type) {
  return request({
    url: `users/${id}/state/${type}`,
    method: 'put'
  })
}

// 添加用户请求
export function addUser(data) {
  return request({
    url: 'users',
    method: "post",
    data: data,
  })
}

// 根据ID 获取用户数据
export function getUserBuyId(id) {
  return request({
    url: 'users/' + id,
  })
}

// 根据ID 修改用户数据
export function editUserBuyId(id,email,mobile) {
  return request({
    url: 'users/' + id,
    method: "put",
    data: {
      email,
      mobile
    }
  });
}

// 根据id删除单个用户
export function DeleteUserBuyId(id) {
  return request({
    url: 'users/' + id,
    method: 'delete'
  })
}

// 分配用户请求
export function SetUserRole(userId, roleId) {
  return request({
    url: 'users/' + userId + '/role',
    method: 'put',
    data: {
      rid: roleId
    }
  })
}
