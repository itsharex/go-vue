import axios from 'axios'
import { useUserStore } from '@/store/modules/user.js'
import storage from '@/utils/storage'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 9999
})
// axios.defaults.baseURL = '/api'
// request interceptors 接口请求拦截
service.interceptors.request.use(
  (config) => {
    const token = storage.get('token')

    config.headers = {
      'x-token': token,
      ...config.headers
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// response interceptors 响应拦截
service.interceptors.response.use(
  (response) => {
    const userStore = useUserStore()
    if (response.headers['new-token']) {
      const token = response.headers['new-token']
      // 存储到 pinia
      userStore.setToken(token)
      // 存储到缓存中
      storage.set('token', token)
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 *
 * @param url
 * @param data
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function post(url, data = {}, params = {}) {
  return service({
    method: 'post',
    url,
    data,
    params
  })
}

/**
 *
 * @param url
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function get(url, params = {}) {
  return service({
    method: 'get',
    url,
    params
  })
}

/**
 *
 * @param url
 * @param data
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function put(url, data = {}, params = {}) {
  return service({
    method: 'put',
    url,
    data,
    params
  })
}

/**
 *
 * @param url
 * @param params
 * @returns {Promise<axios.AxiosResponse<any>>}
 * @private
 */
export function _delete(url, params = {}) {
  return service({
    method: 'delete',
    url,
    params
  })
}

export default service