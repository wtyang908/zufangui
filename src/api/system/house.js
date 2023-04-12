import request from '@/utils/request'

// 查询房屋管理列表
export function listHouse(query) {
  return request({
    url: '/system/house/list',
    method: 'get',
    params: query
  })
}

// 查询房屋管理详细
export function getHouse(id) {
  return request({
    url: '/system/house/' + id,
    method: 'get'
  })
}

// 新增房屋管理
export function addHouse(data) {
  return request({
    url: '/system/house',
    method: 'post',
    data: data
  })
}

// 修改房屋管理
export function updateHouse(data) {
  return request({
    url: '/system/house',
    method: 'put',
    data: data
  })
}

// 删除房屋管理
export function delHouse(id) {
  return request({
    url: '/system/house/' + id,
    method: 'delete'
  })
}

export function getCheckIdNameAndDate() {
  return request({
    url: '/system/house/getCheck' ,
    method: 'get'
  })
}
