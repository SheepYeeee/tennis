import request from '../../utils/request';

// 取得專案舉報
export const craftReports = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'manageReport/craftReport'
		});
		return data;
	} catch (e) {

		return e;
	}
};

// 取得留言舉報
export const commentReports = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'manageReport/craftCommentReport'
		});
		return data;
	} catch (e) {

		return e;
	}
};

// 取得限時動態舉報
export const storyReports = async () => {
	try {
		const { data } = await request({
			method: 'get',
			url: 'manageReport/storyReport'
		});
		return data;
	} catch (e) {

		return e;
	}
};

// 審核Craft舉報
export const confirmCraft = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `manageReport/craftReport/${payload.craftId}/reporter/${payload.reporterId}`,
			data: payload.data
		});
		return data;
	} catch (e){
      
		return e;
	}
};
// 審核Comment舉報
export const confirmComment = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `manageReport/craftCommentReport/${payload.commentId}/reporter/${payload.reporterId}`,
			data: payload.data
		});
		return data;
	} catch (e){
      
		return e;
	}
};
// 審核Story舉報
export const confirmStory = async (payload) => {
	try {
		const { data } = await request({
			method: 'put',
			url: `manageReport/storyReport/${payload.storyId}/reporter/${payload.reporterId}`,
			data: payload.data
		});
		return data;
	} catch (e){
      
		return e;
	}
};