
import axios from 'axios';
import NProgress from 'nprogress';
import { notification } from 'antd';


// 全域參數
axios.defaults.baseURL = `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/api/v1/`;


// 請求攔截器
axios.interceptors.request.use((config) => {
	if(localStorage.getItem('token')){
		config.headers = { 
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
			'Access-Control-Max-Age': '86400',
			'Authorization': `jwt ${localStorage.getItem('token')}`,
			'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        	'Pragma': 'no-cache',
        	'Expires': '0'
		};
	}else{
		config.headers = { 
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
			'Access-Control-Max-Age': '86400',
			'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
        	'Pragma': 'no-cache',
        	'Expires': '0'
		};
	}
  
	// 請求開始 開啟滾動條
	NProgress.start();
	return config;
}, (error) => {
	return Promise.reject(error);
});

// 返回攔截器
axios.interceptors.response.use((response) => {
	// 請求結束 關閉滾動條
	NProgress.done();
	return response;
}, (error) => {
	// 請求結束 關閉滾動條
	NProgress.done();
	return Promise.reject(error);
});

export default function request(opt) {
	// 調用 axios api 
	return axios(opt)
		.then((response) => {
			return { ...response };
		})
		.catch((error) => {
			if(error.response.status === 401){
				notification.error({ message: '尚未登入', description: '需登入會員才能進行該動作' });
			}else{
				notification.error({ message: '請求錯誤', description: error.response.data.message ? error.response.data.message : '請再試一次' });
			}
			return error; 
		});
}