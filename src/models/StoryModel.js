import * as storyService from '../services/auth/StoryService';
import * as anonymousStoryService from '../services/anonymous/StoryService';
export default {
	namespace: 'story',
	state: {
		myStoryCircle: [],
		userStoryCircle: [],
		typeStoryCircle: []
	},
	effects: {
		* storyAllTag ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 取得限動標籤
				const response = yield call (storyService.storyAllTag, payload);
				yield put({ type: 'allStoryTag', payload: response.result.data});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* addStory ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 新增story
				yield call (storyService.create, payload);

				// 更新story圈圈
				const response = yield call (anonymousStoryService.storyIndex);
				yield put({ type: 'myStoryCircle', payload: response.data.myself});
				yield put({ type: 'userStoryCircle', payload: response.data.userStory});
				yield put({ type: 'typeStoryCircle', payload: response.data.typeStory});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* storyIndex ({ callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 更新story圈圈
				const response = yield call (anonymousStoryService.storyIndex);
				yield put({ type: 'myStoryCircle', payload: response.data.myself});
				yield put({ type: 'userStoryCircle', payload: response.data.userStory});
				yield put({ type: 'typeStoryCircle', payload: response.data.typeStory});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* getStorys ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 更新story
				const response = yield call (anonymousStoryService.getStorys, payload);
				yield put({ type: 'allStories', payload: response.data});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* delStory ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 刪除story
				yield call (storyService.delStory, payload);

				// 更新story圈圈 
				const response = yield call (anonymousStoryService.storyIndex);
				yield put({ type: 'myStoryCircle', payload: response.data.myself});
				yield put({ type: 'userStoryCircle', payload: response.data.userStory});
				yield put({ type: 'typeStoryCircle', payload: response.data.typeStory});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* likeStroy ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 按讚story
				yield call (storyService.likeStroy, payload);

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* storySendMessage({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// story傳訊息
				yield call (storyService.storySendMessage, payload);

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* anonymousStory({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 取得單一story
				const response = yield call (anonymousStoryService.anonymousStory, payload);
				yield put({ type: 'oneStory', payload: response.result.data});


				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		}
	},
	reducers: {
		allStoryTag(state, action){
			return {
				...state,
				allStoryTag: [...action.payload]
			};
		},
		myStoryCircle(state, action){
			return {
				...state,
				myStoryCircle: [...action.payload]
			};
		},
		userStoryCircle(state, action){
			return {
				...state,
				userStoryCircle: [...action.payload]
			};
		},
		typeStoryCircle(state, action){
			return {
				...state,
				typeStoryCircle: [...action.payload]
			};
		},
		allStories(state, action){
			return {
				...state,
				allStories: [...action.payload]
			};
		},
		oneStory(state, action){
			return {
				...state,
				oneStory: action.payload
			};
		}
    
	}
};
