import request from '@/utils/request'

// 查询房屋设备列表
export function listFacilities(query) {
  return request({
    url: '/system/facilities/list',
    method: 'get',
    params: query
  })
}

// 查询房屋设备详细
export function getFacilities(id) {
  return request({
    url: '/system/facilities/' + id,
    method: 'get'
  })
}

// 新增房屋设备
export function addFacilities(data) {
  return request({
    url: '/system/facilities',
    method: 'post',
    data: data
  })
}

// 修改房屋设备
export function updateFacilities(data) {
  return request({
    url: '/system/facilities',
    method: 'put',
    data: data
  })
}

// 删除房屋设备
export function delFacilities(id) {
  return request({
    url: '/system/facilities/' + id,
    method: 'delete'
  })
}
