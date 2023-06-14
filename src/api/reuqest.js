import axios from "axios";

const baseUrl=process.env.REACT_APP_BASE_URL
//创建axios实例
const request = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "Application/json;charset=utf-8",
  },
});
//统一配置请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token !== null && token !== "") {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    return err;
  }
);
//统一配置响应拦截器
request.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (err) => {
    let message=""
    if (err.response.status === 504) {
      message="服务器响应超时"
    }

    // 注意这里应该return promise.reject(),
    // 因为如果直接return err则在调用此实例时，响应失败了也会进入then(res=>{})而不是reject或catch方法

    return Promise.reject(message);
  }
);

export default request;
