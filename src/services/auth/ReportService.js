import request from '../../utils/request';

// 所有舉報類別
export const reportType = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'report/reportType'
		});
		return data;
	} catch (e){
        
		return e;
	}
};

// 舉報專案
export const reportCraft = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: `report/craft/${payload.craftsId}`,
			data: payload.data
		});
		return data;
	} catch (e){
        
		return e;
	}
};

// 舉報專案留言
export const reportComment = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: `report/comment/${payload.commentsId}`,
			data: payload.data
		});
		return data;
	} catch (e){
		return e;
	}
};

// 舉報story專案
export const reportStory = async (payload) => {
	try {
		const { data } = await request({
			method: 'post',
			url: `report/story/${payload.storyId}`,
			data: payload.data
		});
		return data;
	} catch (e){
        
		return e;
	}
};

