import { WxAppID, file_host } from "../constants";


export function redirectWXAuthURL() {
  const redirect = 'http://192.168.1.104:8000/home';
  const state = '';
  const scope = 'snsapi_login';
  const authurl = `https://open.weixin.qq.com/connect/qrconnect?appid=${WxAppID}&redirect_uri=${redirect}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
  window.location.href = authurl;
}

export function getQueryString(field) {
  var reg = new RegExp("(^|&)" + field + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

export function saveLocalStorage({type, value}) {
  return window.localStorage.setItem(type, value)
}

export function getLocalStorage(type) {
  let value = window.localStorage.getItem(type);
  return value;
}

export function formatImageUrl(url) {
  return file_host + url;
}

export function formatFile(filePath) {
  let arr = filePath.split('/');
  const name = arr[arr.length-1].split('.')[0];
  const type = arr[arr.length-1].split('.')[1];
  return {name, type}
}
