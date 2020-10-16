import Index from './routes/Index/Index';
import Login from './routes/Login/Login';
import Register from './routes/Register';
import Start from './routes/Start';
import Inbox from './routes/Inbox/Inbox';
import Search from './routes/Search/Search';
import Explore from './routes/Explore/Explore';
import SearchTeam from './routes/Teamwork/SearchTeam';
import MyTeam from './routes/Teamwork/myTeam';
import Forget from './routes/Forget/Forget';
import Reset from './routes/Reset/Reset';
import Report from './routes/Report/Report';
import Verify from './routes/Verify/Verify';
import Member from './routes/Profile/Profile';
import React from 'react';
import { router } from 'dva';
import NewCraft from './routes/Craft/NewCraft';
const { Router, Switch, Route } = router;


function RouterConfig({ history }) {
	return (
		<Router history={history}>
			<Switch>
				<Route path="/" exact component={Index} />
				<Route path="/login" exact component={Login} />
				<Route path="/register" exact component={Register} />
				<Route path="/verify" exact component={Verify} />
				<Route path="/forget" exact component={Forget} />
				<Route path="/reset" exact component={Reset} />
				<Route path="/start" exact component={Start} />
				<Route path="/search" exact component={Search} />
				{/* <Route path="/story/:id" exact component={oneStory} /> */}
				<Route path="/explore/:id" exact component={Explore} />
				{/* <Route path="/explore" exact component={Explore} /> */}
				<Route path="/appleCallback" exact component={Start} />
				<Route path="/inbox" exact component={Inbox} />
				<Route path="/inbox/:name" exact component={Inbox} />
				<Route path="/teamlist" exact component={SearchTeam} />
				<Route path="/myteam" exact component={MyTeam} />
				<Route path="/report/:type" exact component={Report} />
				<Route path="/profile/:name" exact component={Member} />
				<Route path="/newCraft" exact component={NewCraft} />
			</Switch>
		</Router>
	);
}

export default RouterConfig;
