import * as ConfirmService from '../services/admin/ConfirmService';
import { message } from 'antd';

export default {
	namespace: 'confirm',
	state: {},
	effects: {
		* craftReports({ callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 取得所有被檢舉專案
				if (localStorage.getItem('token')) {
					const response = yield call(ConfirmService.craftReports);
					yield put({ type: 'allCraftReports', payload: response.result.data });
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }

			} catch (err) {
				console.log(err);
			}
		},
		* commentReports({ callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 取得所有被檢舉留言
				if (localStorage.getItem('token')) {
					const response = yield call(ConfirmService.commentReports);
					yield put({ type: 'allCommentReports', payload: response.result.data });
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }

			} catch (err) {
				console.log(err);
			}
		},
		* storyReports({ callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 取得所有被檢舉story
				if (localStorage.getItem('token')) {
					const response = yield call(ConfirmService.storyReports);
					yield put({ type: 'allStoryReports', payload: response.result.data });
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }

			} catch (err) {
				console.log(err);
			}
		},
		* confirmCraft({payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				if (localStorage.getItem('token')) {
					// 審核專案舉報
					yield call(ConfirmService.confirmCraft, payload);
					message.success('審核成功');

					//重新取得所有被檢舉專案
					const response = yield call(ConfirmService.craftReports);
					yield put({ type: 'allCraftReports', payload: response.result.data });
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},

		* confirmComment({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				if (localStorage.getItem('token')) {
					// 審核Comment舉報
					yield call(ConfirmService.confirmComment, payload);
					message.success('審核成功');

					//重新取得所有被檢舉Comment
					const response = yield call(ConfirmService.commentReports);
					yield put({ type: 'allCommentReports', payload: response.result.data });
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},

		* confirmStory({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				if (localStorage.getItem('token')) {
					// 審核Story舉報
					yield call(ConfirmService.confirmStory, payload);
					message.success('審核成功');

					//重新取得所有被檢舉Story
					const response = yield call(ConfirmService.storyReports);
					yield put({ type: 'allStoryReports', payload: response.result.data });
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }

			} catch (err) {
				console.log(err);
			}
		}
	},
	reducers: {
		allCraftReports(state, action) {
			return {
				...state,
				allCraftReports: [...action.payload]
			};
		},
		allCommentReports(state, action) {
			return {
				...state,
				allCommentReports: [...action.payload]
			};
		},
		allStoryReports(state, action) {
			return {
				...state,
				allStoryReports: [...action.payload]
			};
		}
	}
};
