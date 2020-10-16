import { fetch } from 'dva';
import { notification } from 'antd';

// 檢查response status
function checkStatus(res) {
	console.log(res);
	if (res.status >= 200 && res.status < 300) {
		return res;
	}
	throw new Error(res.statusText);
}
 
// fetch超時處理
const TIMEOUT = 20000;
const timeoutFetch = (url, options) => {
	let fetchPromise = fetch(url, options);
	let timeoutPromise = new Promise((resolve, reject) => {
		setTimeout(() => reject(new Error('请求超时')), TIMEOUT);
	});
	return Promise.race([fetchPromise, timeoutPromise]);
};
 
/**
 * 請求url，返回promise對象
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
	const defaultOptions = {
		method: 'GET',
		mode: 'cors'
	};
	const mergeOptions = { ...defaultOptions, ...options };
	const token = localStorage.getItem('token') || '';
 
	if (mergeOptions.method === 'POST' || mergeOptions.method === 'PUT') {
		mergeOptions.headers = {
			accept: 'application/json',
			'content-type': 'application/json; charset=utf-8',
			...mergeOptions.headers
		};
		if (token) mergeOptions.headers.Access_token = token;
		mergeOptions.body = JSON.stringify(mergeOptions.body);
	}
 
	return timeoutFetch(`http://172.17.135.180:5000/api/v1/${url}`, mergeOptions)
	// .then(checkStatus)
		.then((response) => {
			return (mergeOptions.method === 'DELETE' || response.status === 204) ? response.text() : response.json();
		})
		.then((data) => {
			if (!data.error) {
				return data;
			} else if (data.message === '沒有authorization或解析錯誤') {
				localStorage.removeItem('token');
				window.localStorage.clear();
				notification.error({ message: '尚未登入', description: '需登入才能進行該動作' });
			} else {
				console.log(data);
				notification.error({ message: '請求錯誤', description: data.message ? data.message : '驗證錯誤' });
			}
		})
		.catch((error) => {
			console.log(error);
		});
}
