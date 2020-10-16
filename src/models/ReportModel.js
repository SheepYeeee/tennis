import * as reportService from '../services/auth/ReportService';
import { message } from 'antd';
export default {
	namespace: 'report',
	state: {},
	effects: {
		* reportType ({ callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 舉報類型
				const response = yield call (reportService.reportType );
				yield put({ type: 'allReportType', payload: response.data});

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* reportCraft ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 舉報專案
				const response = yield call (reportService.reportCraft, payload);
				if(response.message==='report Craft successful'){
					message.success('舉報成功，正在審核該舉報項目');
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* reportComment ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 舉報留言
				const response = yield call (reportService.reportComment, payload);
				if(response.message==='report CraftComment successful'){
					message.success('舉報成功，正在審核該舉報項目');
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		},
		* reportStory ({ payload, callback, loading }, {put, call, select}){
			try{
				if (loading) { loading(true); }

				// 舉報限時動態
				const response = yield call (reportService.reportStory, payload);
				if(response.message==='report successful'){
					message.success('舉報成功，正在審核該舉報項目');
				}

				if (loading) { loading(false); }
				if (callback) { callback(); }
			}catch(err){
				console.log(err);
			}
		}
	},
	reducers: {
		allReportType(state, action){
			return {
				...state,
				allReportType: action.payload
			};
		}
    
	}
};
