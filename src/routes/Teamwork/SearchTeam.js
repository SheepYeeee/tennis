import React, { Component } from 'react';
import { connect } from 'dva';
import {
	Affix,
	Input,
	Select,
	Typography
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './SearchTeam.less';
import Layout from '../../layout/Layout/Layout';
import Teambar from '../../layout/TeamNav/TeamNav';
import TeamCardList from '../../components/TeamCardList/TeamCardList';
const { Option } = Select;
const { Title } = Typography;


//假資料們
const locationData = [
	{
		'locationId': 123,
		'locationName': '台北市'
	},
	{
		'locationId': 124,
		'locationName': '台中市'
	},
	{
		'locationId': 125,
		'locationName': '桃園縣'
	}
];
const teamList = [
	{
		'teamId': 123,
		'userName': '何堂立',
		'userImgUrl': 'https://i.imgur.com/52r3Im0.png',
		'標題': '陶藝工藝品創作',
		'簡介': '以現有設計圖實作陶藝工藝品',
		'內容': '我們是小題大作兒童音樂社，目前籌備與建立品牌中。兩年多來創作了將近80首的原創兒童音樂。歌曲的創作主題皆由孩子的生活體驗和充滿童心的想像出發，希望大人和孩子都能從中找到共鳴。We dream big, we want to be timeless! 我們不追趕流行，也不希望品牌推出後稍縱即逝，我們需要一至二位動畫師將我們的音樂讓視覺美感更加分。',
		'合作期間': '2020.07.01-2020.09.30',
		'合作地點': '臺中市',
		'發布時間': '2020-07-12 10:23:05'
	},
	{
		'teamId': 121,
		'userName': '林麗華',
		'userImgUrl': 'https://newwishart.files.wordpress.com/2020/04/01e785a7e78987e6ada3-1.jpg?w=381',
		'標題': '木藝合作',
		'簡介': '針對幼兒園牆面進行木藝與植栽設計',
		'內容': '．LOGO設計、CIS設計\n．名片設計、海報設計、DM設計\n．包裝設計、書刊設計、型錄設計\n．熟悉紙材、加工、印刷表現\n．具獨立設計及完稿能力\n\n．請主動提供作品集\n．熱愛設計 ♥',
		'合作期間': '2020.07.01-2020.09.30',
		'合作地點': '臺中市',
		'發布時間': '2020-07-20 10:23:05'
	},
	{
		'teamId': 122,
		'userName': '陳廷晉',
		'userImgUrl': 'https://newwishart.files.wordpress.com/2020/04/01e785a7e78987-2.jpg?w=960',
		'標題': '徵求金工設計師',
		'簡介': '首飾與珠寶設計',
		'內容': '我們是小題大作兒童音樂社，目前籌備與建立品牌中。兩年多來創作了將近80首的原創兒童音樂。歌曲的創作主題皆由孩子的生活體驗和充滿童心的想像出發，希望大人和孩子都能從中找到共鳴。We dream big, we want to be timeless! 我們不追趕流行，也不希望品牌推出後稍縱即逝，我們需要一至二位動畫師將我們的音樂讓視覺美感更加分。',
		'合作期間': '2020.07.01-2020.09.30',
		'合作地點': '臺中市',
		'發布時間': '2020-07-12 10:23:05'
	},
	{
		'teamId': 125,
		'userName': '徐永旭',
		'userImgUrl': 'https://newwishart.files.wordpress.com/2020/05/01e785a7e78987e6ada3-7.jpg?w=600',
		'標題': '徵求石藝設計師',
		'簡介': '石藝設計及實作1人',
		'合作期間': '2020.07.01-2020.09.30',
		'合作地點': '臺中市',
		'發布時間': '2020-07-12 10:23:05'
	},
	{
		'teamId': 124,
		'userName': '林麗華',
		'userImgUrl': 'https://newwishart.files.wordpress.com/2020/04/01e785a7e78987e6ada3-1.jpg?w=381',
		'標題': '陶藝工藝品創作',
		'簡介': '以現有設計圖實作陶藝工藝品',
		'內容': '我們是小題大作兒童音樂社，目前籌備與建立品牌中。兩年多來創作了將近80首的原創兒童音樂。歌曲的創作主題皆由孩子的生活體驗和充滿童心的想像出發，希望大人和孩子都能從中找到共鳴。We dream big, we want to be timeless! 我們不追趕流行，也不希望品牌推出後稍縱即逝，我們需要一至二位動畫師將我們的音樂讓視覺美感更加分。',
		'合作期間': '2020.07.01-2020.09.30',
		'合作地點': '臺中市',
		'發布時間': '2020-07-12 10:23:05'
	}
];

const mapStateToProps = state => {
	return {
		allTypes: state.craft.alltypes,
		allReportType: state.report.allReportType
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
		}
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(
	class SearchTeam extends Component {
    state = {
    	inputValue: '',
    	teamTypeValue: '0',
    	locationValue: '0',
    	typeValue: '0',
    	loading: false
    };

    componentDidMount() {
    	if (localStorage.getItem('token')) {
    		// 取得所有舉報類別跟舉報(記得要加key)
    		const { reportType } = this.props;
    		reportType(null, (loading) => this.setState({ loading }));
    	}

    	// 取得所有類別
    	const { types } = this.props;
    	types(null, (loading) => this.setState({ loading }));
    }

    //搜索關鍵字送出
    handleEnter = e => {
    	this.setState({
    		inputValue: e.target.value
    	}, () => {
    		console.log(this.state);
    	});
    };

    //篩選合作類型
    handleTeamtypeChange = value => {
    	this.setState({
    		teamTypeValue: value
    	}, () => {
    		console.log(this.state);
    	});
    };

    //篩選地點
    handleLocationChange = value => {
    	this.setState({
    		locationValue: value
    	}, () => {
    		console.log(this.state);
    	});
    };

    //篩選創作類別
    handleTypesChange = value => {
    	this.setState({
    		typeValue: value
    	}, () => {
    		console.log(this.state);
    	});
    };

    render() {
    	const { goToRoute, allTypes, allReportType } = this.props;

    	let creativeTypes;
    	if (allTypes) {
    		creativeTypes = allTypes.map((type, index) => {
    			return (
    				<Option key={type.typesId} value={type.typesId}>{type.typesName}</Option>
    			);
    		});
    	}
    	const locations = locationData.map((location, index) => {
    		return (
    			<Option key={location.locationId} value={location.locationId}>{location.locationName}</Option>
    		);
    	});

    	return (
    		<Layout>
    			<Teambar>
    				<div className='searchTeam'>
    					<div className='banner' style={{ backgroundImage: 'url(https://a5.behance.net/0fe53d30262f643489ce407408efbb5c9fcece80/img/joblist/job-header.jpg)' }}>
    						<Title level={2} className="banner-text">探索夢寐以求的合作機會</Title>
    					</div>

    					<div className="search-bar">
    						<Affix offsetTop={128}>
    							<Input.Group compact>
    								<Input className='search-input' size='large' title='搜尋合作' placeholder="依關鍵字搜尋合作機會" prefix={<SearchOutlined />} onPressEnter={this.handleEnter} />

    								<Select className='search-select-location' size='large' defaultValue="0" onChange={this.handleLocationChange}>
    									<Option key="0" value="0">所有地點</Option>
    									{locations}
    								</Select>

    								<Select className='search-select-type' size='large' defaultValue="0" onChange={this.handleTypesChange}>
    									<Option key="0" value="0">所有創作類別</Option>
    									{creativeTypes}
    								</Select>

    							</Input.Group>
    						</Affix>
    					</div>
    					<div className='content'>
    						<TeamCardList
    							teamList={teamList}
    						/>
    					</div>
    				</div>
    			</Teambar>
    		</Layout>
    	);
    }
	}
);
