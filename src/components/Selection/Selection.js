import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import {
	HeartOutlined,
	EyeOutlined
} from '@ant-design/icons';
import './Selection.less';

export default class Selection extends Component {
	render() {
		const { selsrc, selname, sellike, selview } = this.props;
		return (
			<Card className="selection"
				bodyStyle={{ padding: '5px 0' }}
				cover={
					<img
						alt={selname}
						src={selsrc}
					/>
				}
			>
				<Row gutter={[16]} className="product">
					<Col span={6}>{selname}</Col>
					<Col span={6} offset={6}><HeartOutlined /> {sellike}</Col>
					<Col span={6}><EyeOutlined /> {selview}千</Col>
				</Row>
			</Card>
		);
	}
}
