import React from 'react';
import { connect } from 'dva';
import _, { values } from 'lodash';
import { Spin } from 'antd';
import CraftList from '../../components/CraftList/CraftList';
import './Explore.less';
import Carousel from '../../components/Carousel/Carousel';
import Layout from '../../layout/Layout/Layout';

const mapStateToProps = state => {
	return {
		allTypes: state.craft.alltypes,
		allCrafts: state.craft.allCrafts,
		allReportType: state.report.allReportType,
		craftInfo: state.craft.craftInfo,
		memberInfo: state.member.memberInfo
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
		},
		searchCraft(payload, callback, loading) {
			dispatch({ type: 'search/searchCraft', payload});
		},
		types(callback, loading) {
			dispatch({ type: 'craft/types', callback, loading});
		},
		view(payload, callback, loading) {
			dispatch({ type: 'craft/view', payload, callback, loading});
		},
		like(payload, callback, loading) {
			dispatch({ type: 'craft/like', payload, callback, loading});
		},
		keep(payload, callback, loading) {
			dispatch({ type: 'craft/keep', payload, callback, loading});
		},
		follow(payload, callback, loading) {
			dispatch({ type: 'member/follow', payload, callback, loading});
		},
		craftModal(payload, callback, loading) {
			dispatch({ type: 'craft/craftModal', payload, callback, loading});
		},
		craftComment(payload, callback, loading) {
			dispatch({ type: 'craft/craftComment', payload, callback, loading});
		},
		reportType(callback, loading) {
			dispatch({ type: 'report/reportType', callback, loading});
		},
		reportCraft(payload, callback, loading) {
			dispatch({ type: 'report/reportCraft', payload, callback, loading});
		},
		reportComment(payload, callback, loading) {
			dispatch({ type: 'report/reportComment', payload, callback, loading});
		},
		editComment(payload, callback, loading) {
			dispatch({ type: 'craft/editComment', payload, callback, loading});
		},
		delComment(payload, callback, loading) {
			dispatch({ type: 'craft/delComment', payload, callback, loading});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class StartPage extends React.Component {
    state = {
    	loading: false
    };


    componentDidMount(){

    	// 取得所有類別
    	const { types } = this.props;
    	types(null, (loading) => this.setState({ loading }));

    	// 取得專案
    	const { searchCraft } = this.props;
    	const { id } = this.props.match.params;
    	let payload =  {
    		sortBy: 'views',
    		typesId: id,
    		keyword: ''
    	};
    	searchCraft(payload, null, (loading) => this.setState({ loading }));

    	if(localStorage.getItem('token')){
    		// 取得所有舉報
    		const { reportType } = this.props;
    		reportType(null, (loading) => this.setState({ loading }));
    	}
      
    }

    // 輪播選擇類別
    onChoose = (value) => {

    	const { allTypes } = this.props;
    	allTypes.map((item)=>{
    		if(item.typesId === value+1){
    			this.setState({
    				title: item.typesName,
    				context: '預設簡介'
    			});
    		}
    	});

    	// 取得專案
    	const { searchCraft } = this.props;
    	let payload =  {
    		sortBy: 'views',
    		typesId: value+1,
    		keyword: ''
    	};
    	searchCraft(payload, null, (loading) => this.setState({ loading }));
    }

    render() {
    	const {view,memberInfo, goToRoute, like, searchCraft, keep, craftComment, editComment, delComment, allCrafts, follow, allReportType, reportComment, reportCraft, allTypes, craftInfo, craftModal} = this.props;
    	const { id } = this.props.match.params;
    	const { loading } = this.state;
    	return (
    		<Layout>
    			
    					<div className='explore'>
    						<Carousel
    							id = {id}
    							goToRoute = {(payload)=>{
    								goToRoute(payload);
    							}}
    							searchCraft = {(payload)=>{
    								searchCraft(payload);
    							}}
    							allTypes={allTypes}
    							onChoose={value=>this.onChoose(value)}
    						/>
    				<div className='content'>
    					{

    						!loading?
    							<CraftList 
    								memberInfo = {memberInfo}
    								allCrafts = {allCrafts}
    								allReportType = {allReportType}
    								craftInfo = {craftInfo}
    								craftComment = {(payload) => {
    									craftComment(payload);
    								}}
    								craftModal = {(payload) => {
    									craftModal(payload);
    								}}
    								editComment = {(payload) => {
    									editComment(payload);
    								}}
    								delComment = {(payload) => {
    									delComment(payload);
    								}}
    								keep = {(payload) => {
    									keep(payload);
    								}}
    								follow = {(payload) => {
    									follow(payload);
    								}}
    								like = {(payload) => {
    									like(payload);
    								}}
    								view = {(payload) => {
    									view(payload);
    								}}
    								reportCraft = {(payload) => {
    									reportCraft(payload);
    								}}
    								reportComment = {(payload) => {
    									reportComment(payload);
    								}}>
    							</CraftList>:<div className="spin">
    								<Spin />
    							</div>
    					}
    						</div>
    					</div>
    		</Layout>
    	);
    }
	}
);
