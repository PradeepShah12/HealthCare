import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios"
import Config from "../../config"
import HttpStatus from "http-status-codes"
import { store, useAppDispatch } from "../../store"

import { setError } from "../../store/Error/error.slice"
import { userLogout } from "../../store/Auth/auth.slice"
import { setUnreadMessage } from "../../store/User/user.slice"
import { ApiError } from "../.."

const RETRY_COUNT_LIMIT = 3

interface CustomConfig extends AxiosRequestConfig {
  __isRetryRequest?: boolean
  _retry?: boolean
  retryCount?: number
}

const api: AxiosInstance = axios.create({
  baseURL: Config.API_URL,
})

// request interceptors
api.interceptors.request.use(async (config) => {
  const { auth } = store.getState()


  if (__DEV__) {
    config.headers["localtonet-skip-warning"] = true
    config.headers["ngrok-skip-browser-warning"]=234
  }

  // if (auth.token) {
  //   config.headers.Authorization = `Bearer ${auth.token}`
  // }

  return config
})

// response interceptors
// response interceptors
// response interceptors




// api.interceptors.response.use(
//   ({data,...all}) => {
//     const dispatch= store.dispatch
// // console.log(data,'metadata')    
// dispatch(setUnreadMessage({unreadMessage:data?.message,unreadNotification:data?.notification}))
// return {data,...all}



//   },
//   async (error) => {
//     const err = error as AxiosError<ApiError>
//     const config = err.config as CustomConfig
//     // Check if the error code is 401 and message is Unauthorized
//     if (
//       Number(err?.response?.data?.code) === HttpStatus.UNAUTHORIZED &&
//       err.response.data?.message === HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) &&
//       !config.__isRetryRequest
//     ) {
//       // If retries exceed the limit, logout user
//       if (config.retryCount >= RETRY_COUNT_LIMIT) {
//         store.dispatch(
//           setError({
//             errorMessage: "Session Expired. You have been logged out.",
//             isSnackBarVisible: true,
//             type: "error",
//           }),
//         )
//         store.dispatch(userLogout())
//         return Promise.reject(error)
//       }

//       // Retry the request
//       config._retry = true
//       config.retryCount = (config.retryCount || 0) + 1

//       return api(config)
//     }

//     // Handle other errors without logging a warning
  
//     return Promise.reject(error)
//   },
// )


export default api
