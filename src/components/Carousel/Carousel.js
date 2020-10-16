import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.less';
import { Button } from 'antd';


export default class Carousel extends Component {
  state = {
  	loading: false
  };

  constructor(props) {
  	super(props);
  	this.next = this.next.bind(this);
  	this.previous = this.previous.bind(this);
  }

  componentDidMount(){
  	const { id } = this.props;
  	this.slider.slickGoTo(id-1);
  }
  
  next = () => {
  	this.slider.slickNext();
  }
  previous = () => {
  	this.slider.slickPrev();
  }

  render() {
  	// 輪播設定
  	const settings = {
  		className: 'center',
  		centerMode: true,
  		infinite: true,
  		draggable: false,
  		centerPadding: '60px',
  		slidesToShow: 5,
  		focusOnSelect: true,
  		arrows: false,
  		afterChange: e => {
  			// 取得專案
  			const { goToRoute, searchCraft } = this.props;
  			let payload =  {
  				sortBy: 'views',
  				typesId: e+1,
  				keyword: ''
  			};
  			searchCraft(payload, null, (loading) => this.setState({ loading }));
  			goToRoute(`/explore/${e+1}`);
  		},
  		responsive: [
  			{
  				breakpoint: 1024,
  				settings: {
  					slidesToShow: 4
  				}
  			},
  			{
  				breakpoint: 950,
  				settings: {
  					slidesToShow: 3
  				}
  			},
  			{
  				breakpoint: 520,
  				settings: {
  					slidesToShow: 2
  				}
  			},
  			{
  				breakpoint: 390,
  				settings: {
  					slidesToShow: 1
  				}
  			}
  		]
  	};

  	// 取得所有類別並塞資料
  	const { allTypes } = this.props;
  	let item;
  	if (allTypes){
  		item = allTypes.map((items, index)=>{
  			return (
  				<div key={index}>
  					<div id={items.typesId} className="imgtop" style={{backgroundImage: `url(${items.typesImgUrl}) `}}>{items.typesName}</div>
  				</div>);
  		});
  	}

  	return (
  		<div className="carousel">
  			<div>
  				<Button className="prev" onClick={this.previous}> 	&lt; </Button>
  				<Button className="next" onClick={this.next}> 	&gt; </Button>
  			</div>

  			<Slider ref={c => (this.slider = c)} {...settings}>
  				{item}
  			</Slider>

  			<br />

  			<div className='intro'>
  				<div className='typeTitle'> </div>
  				<div className='typeContext'> </div>
  			</div>
  		</div>
  	);
  }
}
