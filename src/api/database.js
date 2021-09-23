import request from './request'

// 查询记录信息
export async function getDatabaseQuery(access_token,env,query) {
  return await request.post(`/tcb/databasequery?access_token=${access_token}`, {
      env,
      query
  })
} 
// 更新记录
export async function updateDatabase(access_token,env,query) {
  return await request.post(`/tcb/databaseupdate?access_token=${access_token}`, {
      env,
      query
  })
} 