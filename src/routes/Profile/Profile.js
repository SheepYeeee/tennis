/* eslint-disable indent */
import React from 'react';
import { connect } from 'dva';
import './Profile.less';
import {
	Spin,
	Row,
	Col,
	Avatar,
	Typography
} from 'antd';
import CraftList from '../../components/CraftList/CraftList';
import Layout from '../../layout/Layout/Layout';

const { Title } = Typography;

const mapStateToProps = state => {
	return {
		allTypes: state.craft.alltypes,
		allCrafts: state.craft.allCrafts,
		craftInfo: state.craft.craftInfo,
		allReportType: state.report.allReportType,
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
			dispatch({ type: 'craft/types', callback, loading });
		},

		crafts(callback, loading) {
			dispatch({ type: 'craft/crafts', callback, loading });
		},
		view(payload, callback, loading) {
			dispatch({ type: 'craft/view', payload, callback, loading });
		},
		like(payload, callback, loading) {
			dispatch({ type: 'craft/like', payload, callback, loading });
		},
		keep(payload, callback, loading) {
			dispatch({ type: 'craft/keep', payload, callback, loading });
		},
		follow(payload, callback, loading) {
			dispatch({ type: 'member/follow', payload, callback, loading });
		},
		craftModal(payload, callback, loading) {
			dispatch({ type: 'craft/craftModal', payload, callback, loading });
		},
		craftComment(payload, callback, loading) {
			dispatch({ type: 'craft/craftComment', payload, callback, loading });
		},
		reportType(callback, loading) {
			dispatch({ type: 'report/reportType', callback, loading });
		},
		reportCraft(payload, callback, loading) {
			dispatch({ type: 'report/reportCraft', payload, callback, loading });
		},
		reportComment(payload, callback, loading) {
			dispatch({ type: 'report/reportComment', payload, callback, loading });
		},
		editComment(payload, callback, loading) {
			dispatch({ type: 'craft/editComment', payload, callback, loading });
		},
		delComment(payload, callback, loading) {
			dispatch({ type: 'craft/delComment', payload, callback, loading });
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class ProfilePage extends React.Component {
		state = {
			loading: false
		};

		componentDidMount() {

			if (localStorage.getItem('token')) {
				// 取得所有舉報
				const { reportType } = this.props;
				reportType(null, (loading) => this.setState({ loading }));
			}

			// 取得專案推薦
			const { crafts } = this.props;
			crafts(null, (loading) => this.setState({ loading }));
		}

		render() {
			const { loading } = this.state;
			const { memberInfo, allReportType, editComment, delComment, view, like, follow, keep, craftComment, allCrafts, reportCraft, reportComment, craftInfo, craftModal } = this.props;
			return (
				<Layout>
					{
						!loading ?
							<div className='profile'>
								<div className='profile-banner' style={{ backgroundImage: 'url()' }} />
								<Row>
									<Col md={12} lg={8}>
										<div className='profile-sidebar'>
											<Avatar size={110} src='https://a5.behance.net/ee63f45244a04123f9c3f39fcaafd1268b50d4a1/img/profile/no-image-115.png?cb=264615658' />
											<Title className='profile-userName'>連 曉梅</Title>

										</div>
									</Col>
									<Col md={12} lg={16}>

										<CraftList
											memberInfo={memberInfo}
											allCrafts={allCrafts}
											allReportType={allReportType}
											craftInfo={craftInfo}
											craftComment={(payload) => {
												craftComment(payload);
											}}
											craftModal={(payload) => {
												craftModal(payload);
											}}
											editComment={(payload) => {
												editComment(payload);
											}}
											delComment={(payload) => {
												delComment(payload);
											}}
											keep={(payload) => {
												keep(payload);
											}}
											follow={(payload) => {
												follow(payload);
											}}
											like={(payload) => {
												like(payload);
											}}
											view={(payload) => {
												view(payload);
											}}
											reportCraft={(payload) => {
												reportCraft(payload);
											}}
											reportComment={(payload) => {
												reportComment(payload);
											}}>
										</CraftList>
									</Col>
								</Row>

							</div> : <div className="spin">
								<Spin />
							</div>
					}

				</Layout>
			);
		}
	}
);
