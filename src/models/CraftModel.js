import * as anonymousCraftService from '../services/anonymous/CraftService';
import * as craftService from '../services/auth/AuthCraftService';
import * as searchService from '../services/anonymous/SearchService';
const token = localStorage.getItem('token');

export default {
	namespace: 'craft',
	state: {
		craftInfo: ''
	},
	effects: {
		* types({ callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 取得所有類別
				const response = yield call(anonymousCraftService.types);
				yield put({ type: 'alltypes', payload: response.data });

				if (loading) { loading(false); }
				if (callback) { callback(); }

			} catch (err) {
				console.log(err);
			}
		},
		* crafts({ callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }
				// 取得專案推薦
				if (token) {
					const response = yield call(craftService.authCrafts);
					yield put({ type: 'allCrafts', payload: response.data });
				} else {
					let payload =  {
						sortBy: 'views',
						typesId: 0,
						keyword: ''
					};
					const response = yield call(searchService.searchCraft, payload);
					yield put({ type: 'allCrafts', payload: response.data });
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* craftModal({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 取的單一專案
				const response = yield call(anonymousCraftService.craft, payload);
				yield put({ type: 'craftInfo', payload: response.data });

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* view({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 新增觀看次數
				yield call(anonymousCraftService.view, payload);

				// 更新craft資訊、crafts
				yield put({ type: 'craftModal', payload: payload });

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* like({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 讚賞專案
				yield call(craftService.craftLike, payload);

				// 更新craft資訊、crafts
				yield put({ type: 'craftModal', payload: payload });
				yield put({ type: 'crafts' });

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* keep({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 收藏專案
				yield call(craftService.craftKeep, payload);

				// 更新craft資訊
				yield put({ type: 'craftModal', payload: payload});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* craftComment({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 專案留言
				yield call(craftService.craftComment, payload);

				// 更新craft資訊
				yield put({ type: 'craftModal', payload: payload.craftId});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* delComment({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 刪除留言
				yield call(craftService.delComment, payload.delCommentId);

				// 更新craft資訊
				yield put({ type: 'craftModal', payload: payload.craftId});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* editComment({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 編輯留言
				yield call(craftService.editComment, payload);

				// 更新craft資訊
				yield put({ type: 'craftModal', payload: payload.craftId});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		}
	},
	reducers: {
		alltypes(state, { payload }) {
			return {
				...state,
				alltypes: payload
			};
		},
		allCrafts(state, action) {
			return {
				...state,
				allCrafts: [...action.payload]
			};
		},
		craftInfo(state, action) {
			return {
				...state,
				craftInfo: action.payload
			};
		}
	}
};
