import axios from 'axios'
// const access = localStorage.getItem('access')
const ins = axios.create()

ins.interceptors.request.use((response) => {
  return response
})
export default ins;