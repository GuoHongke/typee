import { sendRequest } from 'services/dataFuncs';
import showLoginOrRegistPopup from 'services/loginService';
import config from 'config';

function objectToStr(value = {}) {
  return Object.keys(value).reduce((params, item, index) => {
    if (index !== Object.keys(value).length - 1) {
      return `${params}${item}=${value[item]}&`;
    }
    return `${params}${item}=${value[item]}`;
  }, '');
}

export default function loginService(dispatch, value) {
  const url = `${config.api}/account/login`;
  sendRequest({
    url,
    method: 'POST',
    value: objectToStr(value),
    callback: (data) => {
      // 请求错误
      if (data.status === 1) {
        window.createTip(data.error_message, 'error');
      } else {
        window.createTip('登录成功!');
        dispatch({
          type: 'IS_LOGGEDIN',
          key: 'isLoggedin',
          value: true,
        });
        // 关闭登录框
        showLoginOrRegistPopup(dispatch, 'showLoginPopup', false);
      }
    },
  });
}