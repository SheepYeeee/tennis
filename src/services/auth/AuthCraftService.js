import request from '../../utils/request';

// 取得專案推薦工藝品
export const authCrafts = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'authCraft'
		});
		return data;
	} catch (e){
		return e;
	}
};

// 讚賞專案
export const craftLike = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `authCraft/like/${payload}`
		});
		return data;
	} catch (e){
    
		return e;
	}
};

// 收藏專案
export const craftKeep = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `authCraft/keep/${payload}`
		});
		return data;
	} catch (e){
    
		return e;
	}
};

// 專案留言
export const craftComment = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: `authCraft/${payload.craftId}/comment`,
			data: payload.form
		});
		return data;
	} catch (e){
    
		return e;
	}
};

// 刪除專案留言
export const delComment = async (payload) => {
	try {
		const { data } = await request({
			method: 'delete',
			url: `authCraft/comment/${payload}`
		});
		return data;
	} catch (e){
    
		return e;
	}
};

// 編輯專案留言
export const editComment = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `authCraft/comment/${payload.commentId}`,
			data: payload.data
		});
		return data;
	} catch (e){
		return e;
	}
};

