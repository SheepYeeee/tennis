import request from '../../utils/request';

// 傳送訊息
export const sendMessage = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: 'inbox/sendMessage',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};

// 訊息列表
export const inbox = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'inbox/'
		});
		return data;
	} catch (e){
		return e;
	}
};

// 聊天室 訊息
export const inboxRoom = async (roomId) => {
	try {
		const { data } = await request({
			method: 'get',
			url: `inbox/${roomId}`
		});
		return data;
	} catch (e){
		return e;
	}
};

// 訊息列表
export const deleteChatRoom = async (payload) =>  {
	try {
		const { data } = await request({
			method: 'delete',
			url: 'inbox/deleteChatRoom',
			data: payload
		});
		return data;
	} catch (e){
		return e;
	}
};
