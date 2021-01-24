// 核心代码模块

// 引入axios
import axios from "axios";
// 导入请求方式
import METHODS from "./methods";
// 导入loading
import { Loading } from "element-ui";
// 定义loading
var loadingInstance;
// 根据环境不同引入不同baseApi地址
import { baseApi } from "@/config";
console.log(baseApi);

// 定义基础路径
// const BASEURL = "http://admintest.happymmall.com/";
// 创建 axios 配置实例
const service = axios.create({
  baseURL: baseApi, //  默认会拼接到请求路径前面
  timeout: 6000 //  请求超时
});

// 请求发送前，弹出loading组件
// 添加请求拦截
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 弹出loading
    // loadingInstance = Loading.service({ fullscreen: true });
    loadingInstance = Loading.service({
      fullscreen: true,
      text: "拼命加载中...",
      spinner: "el-icon-loading",
      background: "rgba(0,0,0,0.7)"
    });
    return config;
  },
  error => {
    // 对请求错误做些什么
    // 提示用户错误信息
    return Promise.reject(error);
  }
);

// 请求结束后，收起loading组件
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    // 关闭loanding
    loadingInstance.close();
    return response;
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

// 请求方法
export function request(method, url, params) {
  switch (method) {
    case METHODS.GET:
      return GET(url, params);

    case METHODS.POST:
      return POST(url, params);
  }
}

// 请求方式
function GET(url, params) {
  return service.get(url, params);
}

function POST(url, params) {
  return service.post(url, params);
}

// function PUT() { }
