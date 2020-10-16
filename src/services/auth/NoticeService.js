import request from '../../utils/request';

// 取得通知
export const notice = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'notice'
		});
		return data;
	} catch (e){
        
		return e;
	}
};

// 已讀通知
export const noticeRead = async () => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'notice/read'
		});
		return data;
	} catch (e){
        
		return e;
	}
};
