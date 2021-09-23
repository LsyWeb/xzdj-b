import request from './request'

export async function get_access_token() {
  return await request.get('/cgi-bin/token', {
    params: {
      grant_type: "client_credential",
      appid: "wx6e53479d56cb8153",
      secret: "4326902fe9c33333c1a650560389e461"
    },
  })
}