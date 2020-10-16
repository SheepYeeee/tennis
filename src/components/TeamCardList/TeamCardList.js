import React, { Component } from 'react';
import {
	Col,
	Row,
	Avatar,
	Card,
	Typography,
	Divider,
	Dropdown,
	Menu,
	Modal,
	Button,
	Radio,
	message
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { handleTime } from '../../assets/normal';
import {
	EnvironmentFilled,
	TagFilled,
	ClockCircleFilled,
	EllipsisOutlined,
	TeamOutlined,
	WarningOutlined
} from '@ant-design/icons';
import './TeamCardList.less';
import moment from 'moment';
const { Title } = Typography;

export default class TeamCraftList extends Component {
    state = {
    	visible: false,
    	key: '',
    	reportTeamId: 0,
    	isShowReportModal: false,
    	modalRadioValue: '',
    	modalValue: ''
    };

    //顯示合作卡片詳情
    showModal = e => {
    	this.setState({
    		visible: true,
    		key: e
    	});
    };

    //關閉合作卡片
    handleCancel = e => {
    	this.setState({
    		visible: false
    	});
    };

    //顯示合作檢舉modal
    showReportModal = e => {
    	this.setState({
    		isShowReportModal: true,
    		isChoose: false,
    		reportTeamId: e
    	});
    }

    //送出合作檢舉modal
    reportModalHandleOk = () => {
    	console.log({
    		choose: this.state.modalRadioValue,
    		text: this.state.modalValue,
    		reportTeamId: this.state.reportTeamId
    	});
    	this.setState({
    		isShowReportModal: false,
    		modalRadioValue: '',
    		modalValue: ''
    	});
    	message.info('已檢舉該專案');
    };

    //關閉合作檢舉modal
    reportModalHandleCancel = e => {
    	this.setState({
    		isShowReportModal: false,
    		modalRadioValue: '',
    		modalValue: ''
    	});
    };

    //更改舉報專案的radio button
    handleRadioChange = e => {
    	this.setState({
    		modalRadioValue: e.target.value
    	});
    };

    //舉報專案的textarea更改
    handleTextareaChange = e => {
    	this.setState({
    		modalValue: e.target.value
    	});
    };

    handleMenuClick = (e, id) => {
    	console.log(e, id);
    }
	
	handleKeyDown = (teamId, e) => {
		if (e.key === 'Enter') {
			this.showModal(teamId);
		}
	}

	render() {
    	const { teamList } = this.props;
    	const { modalRadioValue, modalValue, isShowReportModal } = this.state;

    	// 下拉式選單item
    	const menu = id => (
    		<Menu onClick={this.handleMenuClick.bind(this, id)}>
    			<Menu.Item key="1">
                    檢視
    			</Menu.Item>
    			<Menu.Item key="2">
                    儲存
    			</Menu.Item>
    			<Menu.Item key="3">
                    申請
    			</Menu.Item>
    		</Menu>
    	);
        
    	const carftList = teamList.map((item, index) => {
    		return (
    			<Col lg={6} md={8} sm={12} xs={24} key={item.teamId}>
    				<Card className="teamCard" onClick={() => this.showModal(item.teamId)}  onKeyDown={this.handleKeyDown.bind(this, item.teamId)} tabIndex="0">
    					<Row className="teamCard-header" align="middle">
    						<Col className="teamCard-avatar">
    							<Avatar size={48} src={item.userImgUrl} alt={item.userName} />
    						</Col>
    						<Col className="teamCard-companyDetails">
    							<Title level={3} className="teamCard-userName">{item.userName}</Title>
    							<p className="teamCard-location"><EnvironmentFilled className="icon" size={12} />任何地點</p>
    						</Col>
    					</Row>

    					<Title level={4} className="teamCard-title">{item.標題}</Title>
    					<p className="teamCard-description">
    						{item.簡介}<br />
                            合作期間:{item.合作期間}<br />
                            合作地點:{item.合作地點}
    					</p>
    					<Divider />

    					<div className="teamCard-Meta">
    						{/* <span className="teamCard-teamType"><TagFilled className="icon" />{item.合作類型}</span> */}
    						<span className="teamCard-time"><ClockCircleFilled className="icon" />{handleTime(item.發布時間)}</span>
    						<Dropdown className="teamCard-menu"
    							overlay={menu(item.teamId)}
    							placement="bottomRight"
    						>
    							<EllipsisOutlined />
    						</Dropdown>
    					</div>
    				</Card>
    			</Col>
    		);
    	});

    	let modal = '';
    	if (this.state.visible) {
    		const modalData = teamList.find((item, index) => {
    			return item.teamId === this.state.key;
    		});
    		modal = (
    			<Modal
    				className="cardModal"
    				title={
    					<div className="cardModal-header">
    						<Avatar className="cardModal-avatarImg" size={100} src={modalData.userImgUrl} />
    						<Title level={2} className="cardModal-headerTitle">{modalData.標題}</Title>
    						<p><a href="">{modalData.userName}</a>| {modalData.合作地點}</p>
    						<Button type="primary" shape="round" icon={<TeamOutlined />}>申請合作</Button>
    					</div>
    				}
    				visible={this.state.visible}
    				onCancel={this.handleCancel}
    				footer={null}
    				width={'80%'}
    			>
    				<Row className="cardModal-contentContainer">
    					<Col xs={24} md={12} sm={12}>
    						<div className="cardModal-content">{modalData.內容}</div>
    					</Col>
    					<Col xs={24} md={12} sm={12} className="cardModal-detail">
    						<Card>
    							<div>
    								<Title level={3} className="cardModal-detailTitle">合作類型</Title>
    								<p className="cardModal-detailText">{modalData.合作類型}</p>
    							</div>
    							<div>
    								<Title level={3} className="cardModal-detailTitle">合作地點</Title>
    								<p className="cardModal-detailText">{modalData.合作地點}</p>
    							</div>
    							<div>
    								<Title level={3} className="cardModal-detailTitle">張貼日期</Title>
    								<p className="cardModal-detailText">{moment(modalData.發布時間).format('YYYY/MM/DD')}</p>
    							</div>
    							<div>
    								<Title level={3} className="cardModal-detailTitle">發布人</Title>
    								<Row align="top">
    									<Col flex="50px">
    										<Avatar size={40} src={modalData.userImgUrl} />
    									</Col>
    									<Col>
    										<Title className="cardModal-detailText">{modalData.userName}</Title>
    										<span className="cardModal-detailLocation"><EnvironmentFilled className="icon" />任何地點</span>
    									</Col>
    								</Row>
    							</div>
    						</Card>
    						<div className='cardModal-report'>
    							<Button type="text" icon={<WarningOutlined />} className='report' onClick={() => this.showReportModal(modalData.teamId)}>舉報</Button>
    						</div>
    					</Col>
    				</Row>
    			</Modal>
    		);
    	}


    	return (
    		<div className='teamCraftList'>
    			<Row gutter={[16, 16]}>
    				{carftList}
    			</Row>

    			{modal}
    			<Modal
    				className="reportTeamModal"
    				title="舉報該合作"
    				visible={isShowReportModal}
    				onCancel={this.reportModalHandleCancel}
    				okText="傳送"
    				cancelText="取消"
    				width={420}
    				zIndex={2000}
    				footer={[
    					<Button key="back" onClick={this.reportModalHandleCancel}>
                            取消
    					</Button>,

    					(modalRadioValue && (modalRadioValue !== 1 || modalValue)) ?
    						<Button key="submit" type="primary" onClick={this.reportModalHandleOk} >
                                送出
    						</Button> :
    						<Button key="submit" type="primary" onClick={this.reportModalHandleOk} disabled>
                                送出
    						</Button>
    				]}
    			>
    				<Radio.Group buttonStyle="solid" size="large" onChange={this.handleRadioChange} value={this.state.modalRadioValue}>
    					<Radio.Button value="a">包含版權侵犯</Radio.Button>
    					<Radio.Button value="b">包含商標侵犯</Radio.Button>
    					<Radio.Button value="c">包含成人內容</Radio.Button>
    					<Radio.Button value="d">包含令人反感的內容</Radio.Button>
    					<Radio.Button value="e">其他...</Radio.Button>
    				</Radio.Group>

    				<TextArea className="model-textArea" placeholder='更多說明...' onChange={this.handleTextareaChange} value={this.state.modalValue} />

    			</Modal>
    		</div>
    	);
	}
}
