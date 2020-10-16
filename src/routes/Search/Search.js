import React from 'react';
import { connect } from 'dva';
import _ from 'lodash';
import './Search.less';
import CraftList from '../../components/CraftList/CraftList';
import Layout from '../../layout/Layout/Layout';
import { Row, Col, Input, Select, Spin } from 'antd';
import 'antd/dist/antd.css';
const { Search } = Input;
const { Option } = Select;

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
    	sortBy: 'new',
    	typesId: 0,
    	keyword: '',
    	loading: false
    };


    componentDidMount(){

    	// 取得所有類別
    	const { types } = this.props;
    	types(null, (loading) => this.setState({ loading }));

    	// 取得專案
    	const { searchCraft } = this.props;
    	let payload =  {
    		sortBy: 'new',
    		typesId: 0,
    		keyword: ''
    	};


    	searchCraft(payload, null, (loading) => this.setState({ loading }));

    	if(localStorage.getItem('token')){
    		// 取得所有舉報
    		const { reportType } = this.props;
    		reportType(null, (loading) => this.setState({ loading }));
    	}
     

    }

    // 搜尋
    search = (value) => {
    	this.setState({keyword: value},()=>{
    		let payload =  {
    			sortBy: this.state.sortBy,
    			typesId: this.state.typesId,
    			keyword: this.state.keyword
    		};
    		this.onSearchCraft(payload);
    	});
    };

    // 排序順序
    sortByOnChange = (value) => {
    	this.setState({ sortBy: value },()=>{
    		let payload =  {
    			sortBy: this.state.sortBy,
    			typesId: this.state.typesId,
    			keyword: this.state.keyword
    		};
    		this.onSearchCraft(payload);
    	});
    }

    // 選擇類別
    typeOnChange = (value) => {
    	this.setState({ typesId: value },()=>{
    		let payload =  {
    			sortBy: this.state.sortBy,
    			typesId: this.state.typesId,
    			keyword: this.state.keyword
    		};
    		this.onSearchCraft(payload);
    	});
    };

    // 搜尋
    onSearchCraft = (payload) =>{
    	const { searchCraft } = this.props;
    	searchCraft(payload, null, (loading) => this.setState({ loading }));
    }

    render() {
    	const {view, memberInfo, like, keep, craftComment, allCrafts, follow, editComment, delComment, allReportType, reportComment, reportCraft, allTypes, craftInfo, craftModal} = this.props;
    	const { loading } = this.state;
    	return (
    		<Layout>
    			{
    				!loading ? <div className='search'>
    					<div className="Searchbar">
    						<Row gutter={{ lg: 24, md: 12, sm: 6, xs: 3 }} justify="center">
    							<Col lg={16} md={14} sm={12} xs={24} className='serchbar'>
    								<Search
    									placeholder="搜尋CRAFTPLUS"
    									onSearch={this.search}
    									allowClear
    								/>
    							</Col>
    							<Col lg={4} md={5} sm={6} xs={12}>
    								<Select defaultValue='0' className="select" onChange={this.typeOnChange}>
    									<Option value='0' >全部</Option>
    									{ allTypes?
    										allTypes.map((item)=>{
    											return(
    												<Option key={item.typesId} value={item.typesId}>{item.typesName}</Option>
    											);
    										}):null
    									}
    								</Select>
    							</Col>
    							<Col lg={4} md={5} sm={6} xs={12}>
    								<Select defaultValue="new" className="select" onChange={this.sortByOnChange}>
    									<Option value="new">最新發布</Option>
    									<Option value="views">瀏覽次數最高</Option>
    									<Option value="likes">讚賞次數最高</Option>
    								</Select>
    							</Col>
    						</Row>
    					</div>

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
    				</div>
    					:<div className="spin">
    						<Spin />
    					</div>
    			}

    		</Layout>
    	);
    }
	}
);
