import request from '../../utils/request';

// 搜尋專案、探索專案
export const searchCraft = async (payload) => {
	try {
		const { data } = await request({
			method: 'get',
			url: `search/craft?perPage=20&page=1&typeId=${payload.typesId}&sortBy=${payload.sortBy}&keyword=${payload.keyword}`
		});
		return data;
	} catch (e){
		return e;
	}
};
