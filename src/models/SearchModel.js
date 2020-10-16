import * as searchService from '../services/anonymous/SearchService';
export default {
	namespace: 'search',
	state: {},
	effects: {
		* searchCraft ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 搜尋專案
				const response = yield call (searchService.searchCraft, payload);
				yield put({ type: 'craft/allCrafts', payload: response.data});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		}
    
	},
	reducers: {
    
	}
};
