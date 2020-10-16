import { routerRedux } from 'dva';
import * as inboxService from '../services/auth/InboxService';
export default {
	namespace: 'inbox',
	state: {},
	effects: {
		* sendMessage({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 送出訊息
				const response = yield call(inboxService.sendMessage, payload.data);
				yield put({ type: 'roomId', payload: response.result.data[0].roomId });

				// 更新聊天室
				const response2 = yield call(inboxService.inboxRoom, response.result.data[0].roomId);
				yield put({ type: 'inboxRecord', payload: response2.result.data });
				yield put({ type: 'whoInRoom', payload: [response2.result.oppoent, response2.result.oppentEmail] });
				if(payload.page === 'compose'){
					yield put(routerRedux.push(`/inbox/${response.result.data[0].roomId}`));
				}

				// 更新聊天列表
				const re = yield call(inboxService.inbox);
				re.result.data.map((obj) => {
					return obj.isChecked = false;
				});
				yield put({ type: 'inboxList', payload: re.result.data });

				if (loading) { loading(false); }
				if (callback) { callback(); }

			} catch (err) {
				console.log(err);
			}
		},
		* inbox({callback, loading}, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				// 聊天室列表
				const response = yield call(inboxService.inbox);
				response.result.data.map((obj) => {
					return obj.isChecked = false;
				});
				yield put({ type: 'inboxList', payload: response.result.data });
				yield put({ type: 'unReadInbox', payload: response.result.unRead });

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* inboxRoom({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				if (payload && payload !== 'compose') {
					// 聊天室
					const response = yield call(inboxService.inboxRoom, payload);
					yield put({ type: 'inboxRecord', payload: response.result.data });
					yield put({ type: 'whoInRoom', payload: [response.result.oppoent, response.result.oppentEmail] });

					// 聊天室列表(更新已讀狀態)
					const rep = yield call(inboxService.inbox);
					response.result.data.map((obj) => {
						return obj.isChecked = false;
					});
					yield put({ type: 'inboxList', payload: rep.result.data });
					yield put({ type: 'unReadInbox', payload: rep.result.unRead });

				}

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* deleteChatRoom({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }

				//刪除聊天室
				const response = yield call(inboxService.deleteChatRoom, payload);
				yield put({ type: 'inboxList', payload: response.result.data });

				if (loading) { loading(false); }
				if (callback) { callback(); }

			} catch (err) {
				console.log(err);
			}
		},
		* inboxSocket({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }
				// 聊天室列表socket
				var list = yield select(state => state.inbox.inboxList);
				var unReadInbox = yield select(state => state.inbox.unReadInbox);
				list.map((item) => {
					if (item.roomId === payload.roomId) {
						if(item.notReadCount>0){
							unReadInbox+=1;
						}
						item.lastContext = payload.context;
						item.lastTime = payload.time;
						item.notReadCount = payload.notReadCount;
					}
				});
				yield put({ type: 'unReadInbox', payload: unReadInbox });
				yield put({ type: 'inboxList', payload: list });

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		},
		* inboxRoomSocket({ payload, callback, loading }, { put, call, select }) {
			try {
				if (loading) { loading(true); }
				// 聊天室socket
				let list = yield select(state => state.inbox.inboxRecord);
				list.push(payload);
				yield put({ type: 'inboxRecord', payload: list });

				if (loading) { loading(false); }
				if (callback) { callback(); }
			} catch (err) {
				console.log(err);
			}
		}
	},
	reducers: {
		roomId(state, action) {
			return {
				...state,
				roomId: action.payload
			};
		},
		inboxList(state, action) {
			return {
				...state,
				inboxList: [...action.payload]
			};
		},
		inboxRecord(state, action) {
			return {
				...state,
				inboxRecord: [...action.payload]
			};
		},
		whoInRoom(state, action) {
			return {
				...state,
				whoInRoom: action.payload
			};
		},
		unReadInbox(state, action) {
			return {
				...state,
				unReadInbox: action.payload
			};
		}
	}
};
