import * as noticeService from '../services/auth/NoticeService';
export default {
	namespace: 'notice',
	state: {},
	effects: {
		* notice ({ callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }
            
				// 取得通知
				const response = yield call (noticeService.notice);
				yield put({ type: 'allNotice', payload: response.data });
				yield put({ type: 'unReadNotice', payload: response.unRead });
            
				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				if (loading) { loading(false); }
				console.log(err);
			}
		},
		* noticeRead ({ callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 已讀通知
				yield call (noticeService.noticeRead);

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				if (loading) { loading(false); }
				console.log(err);
			}
		}
	},
	reducers: {
		allNotice(state, action){
			return {
				...state,
				allNotice: [...action.payload]
			};
		},
		unReadNotice(state, action){
			return {
				...state,
				unReadNotice: action.payload
			};
		}
    
	}
};
