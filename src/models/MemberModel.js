import { routerRedux } from 'dva';
import * as anonymousService from '../services/anonymous/AnonymousService';
import * as anonymousCraftService from '../services/anonymous/CraftService';
import * as anonymousStoryService from '../services/anonymous/StoryService';
import * as memberService from '../services/auth/MemeberService';
import * as craftservice from '../services/auth/AuthCraftService';

import { message } from 'antd';

export default {
	namespace: 'member',
	state: {
		memberInfo: ''
	},
	effects: {
		* logout ({callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 登出會員
				yield put({ type: 'memberInfo', payload: null });
				localStorage.removeItem('token');
				localStorage.removeItem('email');
				localStorage.removeItem('type');
       
				// 導向登入頁面
				yield put(routerRedux.push('/login'));
				window.location.reload(false);

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* login ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 登入會員
				const response = yield call (anonymousService.login, payload);
				localStorage.setItem('token', response.result.data.token);
				localStorage.removeItem('type');
				yield put({ type: 'memberInfo', payload: response.result.data});

				// 導向首頁
				yield put(routerRedux.push('/'));

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* register ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 註冊會員
				const response = yield call (anonymousService.register, payload);
				yield put({ type: 'registerRes', payload: response.result });
				localStorage.setItem('token', response.result.data.token);

				if(response.message==='註冊完成 請確認信箱'){
					// 導向驗證頁面
					yield put(routerRedux.push(`/verify?email=${response.result.data.email}`));
				}else if(response.message === 'Third party register successful'){
					localStorage.setItem('token', response.result.data.token);
					localStorage.removeItem('type');
					yield put({ type: 'memberInfo', payload: response.result.data});
  
					// 導向首頁
					yield put(routerRedux.push('/'));
				}
       

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* interestedType ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 選擇偏好類別
				const response = yield call (memberService.interestedType, payload);
				yield put({ type: 'interestedTypes', payload: response});
				message.success('設定成功');

				// 更新crafts
				const response2 = yield call (craftservice.authCrafts);
				yield put({ type: 'craft/allCrafts', payload: response2.data });

				// 更新story圈圈
				const response3 = yield call (anonymousStoryService.storyIndex);
				yield put({ type: 'story/myStoryCircle', payload: response3.data.myself});
				yield put({ type: 'story/userStoryCircle', payload: response3.data.userStory});
				yield put({ type: 'story/typeStoryCircle', payload: response3.data.typeStory});

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* follow ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 關注創作家
				const response = yield call (memberService.follow, payload.id);
				yield put({ type: 'followRes', payload: response.message});

				// 更新craft
				const rep = yield call(anonymousCraftService.craft, payload.craftId);
				yield put({ type: 'craftInfo', payload: rep.data });

				// 更新story圈圈
				const response3 = yield call (anonymousStoryService.storyIndex);
				yield put({ type: 'story/myStoryCircle', payload: response3.data.myself});
				yield put({ type: 'story/userStoryCircle', payload: response3.data.userStory});
				yield put({ type: 'story/typeStoryCircle', payload: response3.data.typeStory});

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* GET_memberInfo ({ callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 會員資訊
				const response = yield call (memberService.memberInfo);
				yield put({ type: 'memberInfo', payload: response.result.data});
				localStorage.setItem('email',response.result.data.email);

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* verifyEmail ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 再寄一次
				const response = yield call (anonymousService.verifyEmail, payload);
				yield put({ type: 'registerRes', payload: response.result });
				message.success(response.message);

				// 導向驗證頁面
				yield put(routerRedux.push(`/verify?email=${payload.resetEmail}`));

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* forgetPassword ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 再寄一次
				const response = yield call (anonymousService.forgetPassword, payload);
				message.success(response.message);

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* updatePassword ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 再寄一次
				const response = yield call (anonymousService.updatePassword, payload);
				message.success(response.message);

				// 導向登入頁面
				setTimeout(() => {
					console.log(null);
				}, 3000);
				yield put(routerRedux.push('/login'));

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* fbLogin ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 臉書登入
				const response = yield call (anonymousService.fbLogin, payload);
        
				if(response.message === '首次登入，請至註冊頁面輸入資料'){
					// 導向註冊
					yield put(routerRedux.push(`/register?email=${response.result.data.email}&name=${response.result.data.name}&imageUrl=${response.result.data.imageUrl}`));
					message.success('首次登入，請至註冊頁面輸入資料');
				}else if(response.message === 'logging successful'){
					localStorage.setItem('token', response.result.data.token);
					yield put({ type: 'memberInfo', payload: response.result.data});
					// 導向首頁
					yield put(routerRedux.push('/'));
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* googleLogin ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// google登入
				const response = yield call (anonymousService.googleLogin, payload);
        
				if(response.message === '首次登入，請至註冊頁面輸入資料'){
					// 導向註冊
					yield put(routerRedux.push(`/register?email=${response.result.data.email}&name=${response.result.data.name}&imageUrl=${response.result.data.imageUrl}`));
					message.success('首次登入，請至註冊頁面輸入資料');
				}else if(response.message === 'logging successful'){
					localStorage.setItem('token', response.result.data.token);
					yield put({ type: 'memberInfo', payload: response.result.data});
					// 導向首頁
					yield put(routerRedux.push('/'));
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		},
		* appleLogin ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// apple登入
				const response = yield call (anonymousService.appleLogin, payload);
        
				if(response.message === '首次登入，請至註冊頁面輸入資料'){
					// 導向註冊
					yield put(routerRedux.push(`/register?email=${response.result.data.email}&name=${response.result.data.name}`));
					message.success('首次登入，請至註冊頁面輸入資料');
				}else if(response.message === 'logging successful'){
					localStorage.setItem('token', response.result.data.token);
					yield put({ type: 'memberInfo', payload: response.result.data});
					// 導向首頁
					yield put(routerRedux.push('/'));
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }

			}catch(err){
				console.log(err);
			}
		}
	},
	reducers: {
		memberInfo(state, action){
			return {
				...state,
				memberInfo: action.payload
			};
		},
		registerRes(state, action){
			return {
				...state,
				registerRes: action.payload
			};
		},
		interestedTypes(state, action){
			return {
				...state,
				interestedTypes: action.payload
			};
		},
		followRes(state, action){
			return {
				...state,
				followRes: action.payload
			};
		}
	}
};
