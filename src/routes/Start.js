import React from 'react';
import { connect } from 'dva';
import {
	Spin
} from 'antd';

const mapStateToProps = state => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class StartPage extends React.Component {
    state = {

    };
	
    componentDidMount(){
    	let query = this.props.location.search;
    	if(query!==''){
    		query = query.replace('?token=','');
    		console.log(query);
    		localStorage.setItem('token', query);
    		// 導向首頁
    		this.props.goToRoute('/');
    	}
    }

    render() {
    	return (
    		<div className='start'>
    			<div className="spin">
    				<Spin />
    			</div>
    		</div>
    	);
    }
	}
);
