import React from 'react';
import { connect } from 'dva';
import './Index.less';
import { Divider, Spin } from 'antd';
import CraftList from '../../components/CraftList/CraftList';
import Layout from '../../layout/Layout/Layout';
import Story from '../../components/Story/Story';


const mapStateToProps = state => {
	return {
		allTypes: state.craft.alltypes,
		allCrafts: state.craft.allCrafts,
		craftInfo: state.craft.craftInfo,
		allReportType: state.report.allReportType,
		allStoryTag: state.story.allStoryTag,
		myStoryCircle: state.story.myStoryCircle,
		userStoryCircle: state.story.userStoryCircle,
		typeStoryCircle: state.story.typeStoryCircle,
		allStories: state.story.allStories,
		memberInfo: state.member.memberInfo
	};
};

const mapDispatchToProps = dispatch => {
	return {
		goToRoute(payload, callback, loading) {
			dispatch({ type: 'global/goToRoute', payload, callback, loading });
		},
		types(callback, loading) {
			dispatch({ type: 'craft/types', callback, loading});
		},

		crafts(callback,loading) {
			dispatch({ type: 'craft/crafts', callback, loading});
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
		},

		storyAllTag(callback, loading) {
			dispatch({ type: 'story/storyAllTag', callback, loading});
		},
		addStory(payload, callback, loading) {
			dispatch({ type: 'story/addStory', payload, callback, loading});
		},
		storyIndex(callback, loading) {
			dispatch({ type: 'story/storyIndex', callback, loading});
		},
		getStorys(payload, callback, loading) {
			dispatch({ type: 'story/getStorys', payload, callback, loading});
		},
		likeStroy(payload, callback, loading) {
			dispatch({ type: 'story/likeStroy', payload, callback, loading});
		},
		delStory(payload, callback, loading) {
			dispatch({ type: 'story/delStory', payload, callback, loading});
		},
		reportStory(payload, callback, loading) {
			dispatch({ type: 'report/reportStory', payload, callback, loading});
		},
		storySendMessage(payload, callback, loading) {
			dispatch({ type: 'story/storySendMessage', payload, callback, loading});
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class IndexPage extends React.Component {
    state = {
    	loading: false
    };

    componentDidMount(){

    	if(localStorage.getItem('token')){
    		// 取得所有舉報
    		const { reportType } = this.props;
    		reportType(null, (loading) => this.setState({ loading }));

    		// 取的所有story標籤
    		const { storyAllTag } = this.props;
    		storyAllTag(null, (loading) => this.setState({loading}));
    	}
      
    	// 取得專案推薦
    	const { crafts } = this.props;
    	crafts(null, (loading) => this.setState({ loading }));

    	// 取得首頁story圈圈列表
    	const { storyIndex } = this.props;
    	storyIndex(null, (loading) => this.setState({ loading }));

    	// 取得所有類別
    	const { types } = this.props;
    	types(null, (loading) => this.setState({ loading }));

    }
    
  

    render() {
    	const {loading} = this.state;
    	const {storySendMessage, reportStory, delStory, memberInfo, likeStroy, allStories, getStorys, typeStoryCircle, myStoryCircle, userStoryCircle, addStory, allTypes, allReportType, allStoryTag, editComment, delComment, view, like, follow, keep, craftComment, allCrafts, reportCraft, reportComment, craftInfo, craftModal} = this.props;
    	return (
    		<Layout>
    			{
    				!loading ?
    					<div className='index'>
              
    						<Story
    							memberInfo = {memberInfo}
    							typeList={allTypes}
    							allReportType = {allReportType}
    							allStoryTag = {allStoryTag}
    							myStoryCircle = {myStoryCircle}
    							typeStoryCircle = {typeStoryCircle}
    							userStoryCircle = {userStoryCircle}
    							allStories = {allStories}
    							addStory = {(payload)=>{
    								addStory(payload);
    							}}
    							getStorys = {(payload)=>{
    								getStorys(payload);
    							}}
    							likeStroy = {(payload)=>{
    								likeStroy(payload);
    							}}
    							delStory = {(payload)=>{
    								delStory(payload);
    							}}
    							reportStory = {(payload)=>{
    								reportStory(payload);
    							}}
    							storySendMessage = {(payload)=>{
    								storySendMessage(payload);
    							}}
    						></Story>
    						<Divider />
    						<div className='content'>
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
    							</CraftList>
    						</div>

    					</div>:<div className="spin">
    						<Spin />
    					</div>
    			}
          
    		</Layout>
    	);
    }
	}
);
