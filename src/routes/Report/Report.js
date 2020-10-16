/* eslint-disable no-empty */
import React, { Component } from 'react';
import { connect } from 'dva';
import {
	Table,
	Tag,
	Space,
	Button,
	Typography,
	Input,
	Modal
} from 'antd';
import {
	SearchOutlined,
	ExclamationCircleTwoTone
} from '@ant-design/icons';
import { handleTime } from '../../assets/normal';
import './Report.less';
import moment from 'moment';
import Layout from '../../layout/AdminLayout/AdminLayout';
import OneStory from '../../components/OneStory/OneStory';
import OneCraft from '../../components/OneCraft/OneCraft';
const { Title } = Typography;

const mapStateToProps = state => {
	return {
		allTypes: state.craft.alltypes,
		allReportType: state.report.allReportType,
		allCraftReports: state.confirm.allCraftReports,
		allCommentReports: state.confirm.allCommentReports,
		allStoryReports: state.confirm.allStoryReports,
		craftInfo: state.craft.craftInfo,
		oneStory: state.story.oneStory,
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
		reportType(callback, loading) {
			dispatch({ type: 'report/reportType', callback, loading });
		},
		craftReports(callback, loading) {
			dispatch({ type: 'confirm/craftReports', callback, loading });
		},
		commentReports(callback, loading) {
			dispatch({ type: 'confirm/commentReports', callback, loading });
		},
		storyReports(callback, loading) {
			dispatch({ type: 'confirm/storyReports', callback, loading });
		},
		confirmCraft(payload, callback, loading) {
			dispatch({ type: 'confirm/confirmCraft', payload, callback, loading });
		},
		confirmComment(payload, callback, loading) {
			dispatch({ type: 'confirm/confirmComment', payload, callback, loading });
		},
		confirmStory(payload, callback, loading) {
			dispatch({ type: 'confirm/confirmStory', payload, callback, loading });
		},
		craftModal(payload, callback, loading) {
			dispatch({ type: 'craft/craftModal', payload, callback, loading });
		},
		anonymousStory(payload, callback, loading) {
			dispatch({ type: 'story/anonymousStory', payload, callback, loading });
		},
		craftComment(payload, callback, loading) {
			dispatch({ type: 'craft/craftComment', payload, callback, loading });
		},
		reportCraft(payload, callback, loading) {
			dispatch({ type: 'report/reportCraft', payload, callback, loading });
		},
		reportComment(payload, callback, loading) {
			dispatch({ type: 'report/reportComment', payload, callback, loading });
		},
		like(payload, callback, loading) {
			dispatch({ type: 'craft/like', payload, callback, loading });
		},
		keep(payload, callback, loading) {
			dispatch({ type: 'craft/keep', payload, callback, loading });
		},
		follow(payload, callback, loading) {
			dispatch({ type: 'member/follow', payload, callback, loading });
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class Report extends Component {
        state = {
        	searchText: '',
        	searchedColumn: '',
        	type: '',
        	reported: {},
        	storyVisible: false,
        	confirmVisible: false,
        	loading: false,
        	craftId: 0
        };

        async componentDidMount() {
        	const { type } = this.props.match.params;
        	if (localStorage.getItem('token')) {
        		this.setState({
        			type: type
        		});
        		// 先取得所有舉報類別，再根據頁面判斷獲取哪支列表
        		const { reportType, craftReports, commentReports, storyReports } = this.props;
        		await reportType(null, (loading) => this.setState({ loading }));
        		switch (type) {
        		case 'craft':
        			await craftReports(null, (loading) => this.setState({ loading }));
        			break;
        		case 'comment':
        			await commentReports(null, (loading) => this.setState({ loading }));
        			break;
        		case 'story':
        			await storyReports(null, (loading) => this.setState({ loading }));
        			break;
        		default:
        			break;
        		}
        	}

        	// 取得所有類別
        	const { types } = this.props;
        	await types(null, (loading) => this.setState({ loading }));
        }

        //在不同類別的頁面切換時也要call API
        async componentDidUpdate() {
        	const { type } = this.props.match.params;
        	//判斷是否為同一個頁面，不是才重新call一次API
        	if (type !== this.state.type) {
        		this.setState({
        			type: type
        		});
        		const { craftReports, commentReports, storyReports } = this.props;
        		switch (type) {
        		case 'craft':
        			await craftReports(null, (loading) => this.setState({ loading }));
        			break;
        		case 'comment':
        			await commentReports(null, (loading) => this.setState({ loading }));
        			break;
        		case 'story':
        			await storyReports(null, (loading) => this.setState({ loading }));
        			break;
        		default:
        			break;
        		}
        	}
        }

        //顯示同意舉報的二次確認
        showConfirm = (type, item) => {
        	this.setState({
        		confirmVisible: true,
        		type: type,
        		reported: item
        	});
        }

        //關閉同意舉報的二次確認
        closeConfirm = () => {
        	this.setState({
        		confirmVisible: false
        	});
        }

        //同意舉報的二次確認通過
        confirmOk = () => {
        	this.setState({
        		confirmVisible: false
        	});
        	const { type, reported } = this.state;
        	this.handleSubmit(type, reported, true);
        };

        //審核送出
        handleSubmit = (type, item, confirm) => {
        	let payload = {
        		reporterId: item.reporterId,
        		data: {
        			isConfirm: confirm
        		}
        	};
        	switch (type) {
        	case 'craft':{
        		payload.craftId = item.craftId;
        		const { confirmCraft } = this.props;
        		confirmCraft(payload, null, (loading) => this.setState({ loading }));
        		break;
        	}
        	case 'comment':{
        		payload.commentId = item.commentId;
        		const { confirmComment } = this.props;
        		confirmComment(payload, null, (loading) => this.setState({ loading }));
        		break;
        	}
        	case 'story':{
        		payload.storyId = item.storyId;
        		const { confirmStory } = this.props;
        		confirmStory(payload, null, (loading) => this.setState({ loading }));
        		break;
        	}
        	default:
        		break;
        	}
        }

        //顯示作品內容
        showCraftInfo = crarftId => {
        	document.getElementById('cardInfo').style.display = 'block';
        	const { craftModal } = this.props;

        	this.setState({
        		craftId: crarftId
        	});

        	// 顯示單一工藝品專案
        	craftModal(crarftId, null, (loading) => this.setState({ loading }));
        };

        //關閉作品內容
        closeCraft = () => {
        	document.getElementById('cardInfo').style.display = 'none';
        };

        // 顯示限時動態
        showStory = storyId => {
        	const { anonymousStory } = this.props;
        	anonymousStory(storyId);
        	this.setState({
        		storyVisible: true
        	});
        };

        //關閉限時動態
        closeStory = () => {
        	this.setState({
        		storyVisible: false
        	});
        };

        //取得要搜尋的欄位，並製作搜尋下拉式選單
        getColumnSearchProps = dataIndex => ({
        	filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        		<div style={{ padding: 8 }}>
        			<Input
        				ref={node => {
        					this.searchInput = node;
        				}}
        				placeholder={`Search ${dataIndex}`}
        				value={selectedKeys[0]}
        				onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        				onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        				style={{ width: 188, marginBottom: 8, display: 'block' }}
        			/>
        			<Space>
        				<Button
        					type="primary"
        					onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
        					icon={<SearchOutlined />}
        					size="small"
        					style={{ width: 90 }}
        				>
                            Search
        				</Button>
        				<Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                            Reset
        				</Button>
        			</Space>
        		</div>
        	),
        	filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        	onFilter: (value, record) =>
        		record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
        	onFilterDropdownVisibleChange: visible => {
        		if (visible) {
        			setTimeout(() => this.searchInput.select());
        		}
        	},
        	render: text => text
        });

        //表格欄位內容搜尋
        handleSearch = (selectedKeys, confirm, dataIndex) => {
        	confirm();
        	this.setState({
        		searchText: selectedKeys[0],
        		searchedColumn: dataIndex
        	});
        };

        //清除已有的搜尋
        handleReset = clearFilters => {
        	clearFilters();
        	this.setState({ searchText: '' });
        };


        render() {
        	const { allTypes, allReportType, memberInfo, craftInfo, oneStory, allCraftReports, allCommentReports, allStoryReports, editComment, delComment, like, follow, keep, craftComment, reportCraft, reportComment, craftModal } = this.props;
        	const { type, craftId } = this.state;
        	let columns = [];
        	let titleText = '';
        	let data;
        	const now = moment();

        	// 取得舉報項目，以便篩選
        	let reportTypes;
        	if (allReportType) {
        		reportTypes = allReportType.map((item, index) => {
        			return ({
        				text: item.reportTypeName,
        				value: item.reportTypeId
        			});
        		});
        	}
        	// 取得限時動態類別，以便篩選
        	let storyTypes;
        	if (allTypes) {
        		storyTypes = allTypes.map((type, index) => {
        			return ({
        				text: type.typesName,
        				value: type.typesId
        			});
        		});
        	}

        	//幫舉報類別分顏色
        	const tagColor = type => {
        		let color;
        		switch (type) {
        		case '包含版權侵犯': color = 'geekblue'; break;
        		case '包含版權商標侵犯': color = 'magenta'; break;
        		case '包含兒童色情': color = 'red'; break;
        		case '包含令人反感的內容': color = 'purple'; break;
        		case '其他': color = 'cyan'; break;
        		default: color = '#f50'; break;
        		}
        		return color;
        	};

        	switch (type) {
        	case 'craft':
        		titleText = '專案';
        		if (allCraftReports) {
        			//資料需要有key值table展開時才不會打架
        			allCraftReports.forEach(function (item, index, array) {
        				item.key = index;
        				if (!item.reportContext){
        					item.reportContext='-';
        				}
        			});
        			data = allCraftReports;
        			columns = [
        				{
        					title: '舉報類型',
        					dataIndex: 'reportTypeName',
        					width: 140,
        					filters: reportTypes,
        					onFilter: (value, data) => data.reportTypeId === value,
        					render: type => <Tag color={tagColor(type)}>{type}</Tag>
        				},
        				{
        					title: '舉報時間',
        					dataIndex: 'reportTime',
        					responsive: ['md'],
        					width: 110,
        					defaultSortOrder: 'descend',
        					sortDirections: ['descend', 'ascend'],
        					sorter: (a, b) => now.diff(a.reportTime, 'seconds') - now.diff(b.reportTime, 'seconds'),
        					render: reportTime => <>{handleTime(reportTime)}</>
        				},
        				{
        					title: '舉報者',
        					dataIndex: 'reporterName',
        					responsive: ['lg'],
        					width: 95,
        					...this.getColumnSearchProps('reporterName')
        				},
        				{
        					title: '舉報原因說明',
        					dataIndex: 'reportContext',
        					ellipsis: true,
        					width: 180
        				},
        				{
        					title: '工藝品名稱',
        					dataIndex: 'craftName',
        					responsive: ['md'],
        					width: 140,
        					...this.getColumnSearchProps('craftName')
        				},
        				{
        					title: '作者',
        					dataIndex: 'craftOwner',
        					responsive: ['lg'],
        					width: 80,
        					...this.getColumnSearchProps('craftOwner')
        				},
        				{
        					title: '查看',
        					width: 64,
        					dataIndex: 'craftId',
        					render: craftId => (
        						<Button
        							className="viewBtn"
        							type="primary"
        							shape="circle"
        							icon={<SearchOutlined />}
        							onClick={() => this.showCraftInfo(craftId)}
        						/>
        					)
        				},
        				{
        					title: '操作',
        					width: 100,
        					render: item => (
        						<Space size="small">
        							<a onClick={() => this.showConfirm(type, item)}>通過</a>
        							<a onClick={() => this.handleSubmit(type, item, false)}>駁回</a>
        						</Space>
        					)
        				}
        			];

        		}
        		break;
        	case 'comment':
        		titleText = '留言';
        		if (allCommentReports) {
        			//資料需要有key值table展開時才不會打架
        			allCommentReports.forEach(function (item, index, array) {
        				item.key = index;
        				if (!item.reportContext){
        					item.reportContext='-';
        				}
        			});
        			data = allCommentReports;
        			columns = [
        				{
        					className: 'report-type',
        					title: '舉報類型',
        					dataIndex: 'reportTypeName',
        					width: 140,
        					filters: reportTypes,
        					onFilter: (value, data) => data.reportTypeId === value,
        					render: type => <Tag color={tagColor(type)}>{type}</Tag>
        				},
        				{
        					title: '舉報時間',
        					dataIndex: 'reportTime',
        					responsive: ['md'],
        					width: 110,
        					defaultSortOrder: 'descend',
        					sorter: (a, b) => now.diff(a.reportTime, 'seconds') - now.diff(b.reportTime, 'seconds'),
        					render: reportTime => <>{handleTime(reportTime)}</>
        				},
        				{
        					title: '舉報者',
        					dataIndex: 'reporterName',
        					responsive: ['lg'],
        					width: 95,
        					...this.getColumnSearchProps('reporterName')
        				},
        				{
        					title: '舉報原因說明',
        					dataIndex: 'reportContext',
        					ellipsis: true,
        					width: 180
        				},
        				{
        					title: '留言用戶',
        					dataIndex: 'commenterName',
        					responsive: ['lg'],
        					width: 115,
        					...this.getColumnSearchProps('commenterName')
        				},
        				{
        					title: '留言內容',
        					dataIndex: 'commentText',
        					responsive: ['md'],
        					width: 120,
        					...this.getColumnSearchProps('commentText')
        				},
        				{
        					title: '查看',
        					width: 64,
        					dataIndex: 'craftId',
        					render: craftId => (
        						<Button
        							className="viewBtn"
        							type="primary"
        							shape="circle"
        							icon={<SearchOutlined />}
        							onClick={() => this.showCraftInfo(craftId)}
        						/>
        					)
        				},
        				{
        					title: '操作',
        					width: 100,
        					render: item => (
        						<Space size="small">
        							<a onClick={() => this.showConfirm(type, item)}>通過</a>
        							<a onClick={() => this.handleSubmit(type, item, false)}>駁回</a>
        						</Space>
        					)
        				}
        			];
        		}
        		break;
        	case 'story':
        		titleText = '限時動態';
        		if (allStoryReports) {
        			//資料需要有key值table展開時才不會打架
        			allStoryReports.forEach(function (item, index, array) {
        				item.key = index;
        				if (!item.reportContext){
        					item.reportContext='-';
        				}
        			});
        			data = allStoryReports;
        			columns = [
        				{
        					title: '舉報類型',
        					dataIndex: 'reportTypeName',
        					width: 140,
        					filters: reportTypes,
        					onFilter: (value, data) => data.reportTypeId === value,
        					render: type => <Tag color={tagColor(type)}>{type}</Tag>
        				},
        				{
        					title: '舉報時間',
        					dataIndex: 'reportTime',
        					responsive: ['md'],
        					width: 110,
        					defaultSortOrder: 'descend',
        					sortDirections: ['descend', 'ascend'],
        					sorter: (a, b) => now.diff(a.reportTime, 'seconds') - now.diff(b.reportTime, 'seconds'),
        					render: reportTime => <>{handleTime(reportTime)}</>
        				},
        				{
        					title: '舉報者',
        					dataIndex: 'reporterName',
        					responsive: ['lg'],
        					width: 95,
        					...this.getColumnSearchProps('reporterName')
        				},
        				{
        					title: '舉報原因說明',
        					dataIndex: 'reportContext',
        					ellipsis: true,
        					width: 180
        				},
        				{
        					title: '類別',
        					dataIndex: 'storyType',
        					responsive: ['md'],
        					width: 90,
        					filters: storyTypes,
        					onFilter: (value, data) => data.storyTypeId === value,
        					render: type => <Tag color='blue'>{type}</Tag>
        				},
        				{
        					title: '上傳用戶',
        					dataIndex: 'storyOwner',
        					responsive: ['lg'],
        					width: 105
        				},
        				{
        					title: '查看',
        					width: 64,
        					dataIndex: 'storyId',
        					render: storyId => (
        						<Button
        							className="viewBtn"
        							type="primary"
        							shape="circle"
        							icon={<SearchOutlined />}
        							onClick={() => this.showStory(storyId)}
        						/>
        					)
        				},
        				{
        					title: '操作',
        					width: 100,
        					render: item => (
        						<Space size="small">
        							<a onClick={() => this.showConfirm(type, item)}>通過</a>
        							<a onClick={() => this.handleSubmit(type, item, false)}>駁回</a>
        						</Space>
        					)
        				}
        			];
        		}
        		break;
        	default:
        		break;
        	}

        	return (
        		<Layout>
        			<div className='report'>
        				<Title level={2}>審核{titleText}舉報</Title>

        				<Table
        					loading={this.state.loading}
        					className="report-table"
        					columns={columns}
        					pagination={{
        						showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        					}}
        					expandable={{
        						expandedRowRender: data => (
        							type === 'comment' ?
        								<div className="table-unfold">
        									<div className="tableUnfold-div">
        										<Title level={3} className="tableUnfold-title">舉報原因說明:</Title>
        										<p className="tableUnfold-text">{data.reportContext}</p>
        									</div>
        									<div className="tableUnfold-div">
        										<Title level={3} className="tableUnfold-commentUser">留言者:</Title>
        										<span className="tableUnfold-text">{data.commenterName}</span>
        									</div>
        									<div className="tableUnfold-div">
        										<Title level={3} className="tableUnfold-title">留言內容:</Title>
        										<p className="tableUnfold-text">{data.commentText}</p>
        									</div>
        								</div>
        								: <p style={{ margin: 0 }}>{data.reportContext}</p>),
        						rowExpandable: data => (type === 'comment' ? true : data.reportContext.length > 10)
        					}}

        					dataSource={data}
        				/>

        				<OneCraft
        					craftId={craftId}
        					memberInfo={memberInfo}
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
        					reportCraft={(payload) => {
        						reportCraft(payload);
        					}}
        					reportComment={(payload) => {
        						reportComment(payload);
        					}}
        				>

        				</OneCraft>

        				{this.state.storyVisible ?
        					<OneStory
        						story={oneStory}
        						closeStory={this.closeStory}
        					/>
        					: null
        				}


        				<Modal
        					title="舉報通過"
        					visible={this.state.confirmVisible}
        					onOk={this.confirmOk}
        					onCancel={this.closeConfirm}
        					okText="確認"
        					cancelText="取消"
        				>
        					<h3><ExclamationCircleTwoTone twoToneColor="#faad14" />確定要通過嗎</h3>
        					<p>通過後該{titleText}將不會再出現</p>
        				</Modal>
        			</div>
        		</Layout>
        	);
        }
	}
);
