import { routerRedux } from 'dva';
// const { routerRedux } = router;

export default {
	namespace: 'global',

	state: {},

	effects: {
		* goToRoute({ payload, callback, loading }, { put }) {
			if (loading) { loading(true); }
			yield put(routerRedux.push(payload));
			if (loading) { loading(false); }
			if (callback) { callback(); }
		}
	},

	reducers: {

	}
};
