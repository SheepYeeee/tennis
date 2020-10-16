import  'react-app-polyfill/ie11';
import  'react-app-polyfill/stable';
import dva from 'dva';
// import createLoading from 'dva-loading';
// import { persistStore, autoRehydrate } from 'redux-persist';
import './index.less';


// 1. Initialize
const app = dva({
	onReducer: r => (state, action) => {
		const newState = r(state, action);
		if (action.payload && action.payload.actionType === 'member/logout') {
			return { app: newState.app, loading: newState.loading, routing: newState.routing };
		}
		return newState;
	}
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/Global').default);
app.model(require('./models/MemberModel').default);
app.model(require('./models/InboxModel').default);
app.model(require('./models/CraftModel').default);
app.model(require('./models/ReportModel').default);
app.model(require('./models/SearchModel').default);
app.model(require('./models/NoticeModel').default);
app.model(require('./models/StoryModel').default);
app.model(require('./models/ConfirmModel').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
