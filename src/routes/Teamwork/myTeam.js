import React, { Component } from 'react';
import { connect } from 'dva';
import {
	Button,
	Row,
	Col,
	Input,
	Radio,
	Collapse
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './myTeam.less';
import Layout from '../../layout/Layout/Layout';
import Teambar from '../../layout/TeamNav/TeamNav';
const { Panel } = Collapse;


//假資料們
const myTeamList = [
	{
		'teamId': 123,
		'userName': '何堂立',
		'userImgUrl': 'https://scontent-tpe1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p640x640/93779163_844952732678513_1408371390804278099_n.jpg?_nc_ht=scontent-tpe1-1.cdninstagram.com&_nc_cat=105&_nc_ohc=l_Dd7Eb_TlgAX8vegTv&oh=a5933891346b578ac88a9e3aec7da776&oe=5F3A6B23',
		'標題': '陶藝工藝品創作',
		'簡介': '以現有設計圖實作陶藝工藝品',
		'內容': '我們是小題大作兒童音樂社，目前籌備與建立品牌中。兩年多來創作了將近80首的原創兒童音樂。歌曲的創作主題皆由孩子的生活體驗和充滿童心的想像出發，希望大人和孩子都能從中找到共鳴。We dream big, we want to be timeless! 我們不追趕流行，也不希望品牌推出後稍縱即逝，我們需要一至二位動畫師將我們的音樂讓視覺美感更加分。',
		'合作期間': '2020.07.01-2020.09.30',
		'合作地點': '臺中市',
		'發布時間': '2020-07-22T01:29:35.818Z'
	},
	{
		'teamId': 121,
		'標題': '平面設計師',
		'簡介': '我們正在尋找平面設計師',
		'內容': '．LOGO設計、CIS設計\n．名片設計、海報設計、DM設計\n．包裝設計、書刊設計、型錄設計\n．熟悉紙材、加工、印刷表現\n．具獨立設計及完稿能力\n\n．請主動提供作品集\n．熱愛設計 ♥',
		'合作期間': '2020.07.01-2020.09.30',
		'合作地點': '臺中市',
		'發布時間': '2020-07-20T01:29:35.818Z'
	},
	{
		'teamId': 122,
		'標題': '【總公司】設計師 (請附作品)(外商公司Aunt Stella)',
		'簡介': '製作手工餅乾最重要的過程不是控制烤爐的溫度，而是為了某個人而作的溫暖心意，這才是手工餅乾最珍貴之處 - By Stella Dunkle',
		'內容': '我們是小題大作兒童音樂社，目前籌備與建立品牌中。兩年多來創作了將近80首的原創兒童音樂。歌曲的創作主題皆由孩子的生活體驗和充滿童心的想像出發，希望大人和孩子都能從中找到共鳴。We dream big, we want to be timeless! 我們不追趕流行，也不希望品牌推出後稍縱即逝，我們需要一至二位動畫師將我們的音樂讓視覺美感更加分。',
		'合作期間': '2020.07.01-2020.09.30',
		'合作地點': '臺中市',
		'發布時間': '2020-05-23T01:29:35.818Z'
	}
];


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
	class MyTeam extends Component {
		state = {
			radioValue: 2
		};

		//轉換檢視類型
		radioOnChange = e => {
			console.log(e.target.value);
			this.setState({
				radioValue: e.target.value
			});
		};


		render() {
			const { goToRoute } = this.props;
			const { radioValue } = this.state;
			const radioText = ['所有合作招募', '招募中的合作', '已結束的合作招募'];

			return (
				<Layout>
					<Teambar>
						<div className='myTeam'>
							<Row>
								<Col xs={24} sm={10} md={10} lg={8}>
									<div className="myTeam-left">
										<div className="myTeam-div">

											<Button className="create-btn" shape="round">張貼新合作</Button>
										</div>
										<div className="myTeam-div">
											依關鍵字搜索
											<Input className='search-input' placeholder="搜尋..." prefix={<SearchOutlined />} onPressEnter={this.handleEnter} />
										</div>
										<div className="myTeam-div">
											檢視
											<Radio.Group buttonStyle="solid" onChange={this.radioOnChange} value={radioValue}>
												<Radio className="radio-item" value={1}>
													{radioText[0]}
													<span className="radio-count">0</span>
												</Radio>
												<Radio className="radio-item" value={2}>
													{radioText[1]}
													<span className="radio-count">0</span>
												</Radio>
												<Radio className="radio-item" value={3}>
													{radioText[2]}
													<span className="radio-count">0</span>
												</Radio>
											</Radio.Group>
										</div>
									</div>
								</Col>
								<Col xs={24} sm={14} md={14} lg={16}>
									<div className="myTeam-right">

										<div className="myTeam-div">
											<span className="right-header">{radioText[radioValue - 1]}</span>
										</div>
										<div>
											<Collapse className="myTeam-content" bordered={false}>
												<Panel header="陶藝工藝品創作" key="1">
													<div className="content-text">
														{myTeamList[1].內容}
													</div>
												</Panel>
												<Panel header="This is panel header 2" key="2">
													<p style={{ paddingLeft: 24 }}>
														A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
														as a welcome guest in many households across the world.
													</p>
												</Panel>
												<Panel header="This is panel header 3" key="3">
													<p style={{ paddingLeft: 24 }}>
														A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
														as a welcome guest in many households across the world.
													</p>
												</Panel>
											</Collapse>

										</div>
									</div>
								</Col>
							</Row>

						</div>
					</Teambar>
				</Layout>
			);
		}
	}
);
