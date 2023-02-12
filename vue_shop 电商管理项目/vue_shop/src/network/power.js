import { request } from './request'

//获取用户列表数据
export function getRoleList() {
  return request({
    url: 'roles',
  })
}

// 添加角色
export function addRoleUser(data) {
  return request({
    url: 'roles',
    method: "post",
    data: data
  })
}

// 根据id查询角色
export function getUserBuyId(id) {
  return request({
    url: 'roles/' + id,
  })
}
// 根据ID编辑角色
export function editUserBuyId(id, roleName, roleDesc) {
  return request({
    url: 'roles/' + id,
    method: "put",
    data: {
      roleName,
      roleDesc
    }
  });
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: 'roles/' + id,
    method: "delete",
  })
}

// 删除角色指定权限
export function removeRight(roleId, rightId) {
  return request({
    url: 'roles/' + roleId + '/rights/' + rightId,
    method: "delete",
  })
}

// 分配角色权限
export function allotRights(roleId, rids) {
  return request({
    url: 'roles/' + roleId + '/rights',
    method: "post",
    data: {
      rids
    }
  })
}



//获取权限列表数据
export function getRightsList(type = 'list') {
  return request({
    url: 'rights/' + type,
  })
}

