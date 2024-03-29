import request from '@/utils/request'

// 查询房屋评论列表
export function listComments(query) {
  return request({
    url: '/system/comments/list',
    method: 'get',
    params: query
  })
}

// 通过房屋id查询房屋评论列表，值包含多个
export function listCommentsByHouseId(houseId) {
  return request({
    url: '/system/comments/getByHouseId/'+houseId,
    method: 'get',
  })
}

// 查询房屋评论详细
export function getComments(id) {
  return request({
    url: '/system/comments/' + id,
    method: 'get'
  })
}

// 新增房屋评论
export function addComments(data) {
  return request({
    url: '/system/comments',
    method: 'post',
    data: data
  })
}

// 修改房屋评论
export function updateComments(data) {
  return request({
    url: '/system/comments',
    method: 'put',
    data: data
  })
}

// 删除房屋评论
export function delComments(id) {
  return request({
    url: '/system/comments/' + id,
    method: 'delete'
  })
}
