/**
 * Created by Marnie.Palapar on 5/8/2017.
 */
import React from 'react';
import ReactSlick from 'react-slick';
import LazyImage from 'comp/LazyImage';
import { Link } from 'react-router';

let Slider = (props) => {

	const SETTINGS = {
		autoplay:  props.enableAutoplay,
		arrows:  props.showArrows,
		dots:  props.showDots,
		infinite:  props.infinite,
		slidesToShow:  props.noItemsToShow,
		slidesToScroll:  props.itemsToScroll,
		speed: props.speed,
		swipe:  props.enableSwipe,
	};

	let displayItems = (props.banners.length) && props.banners.map((item, i) => {
			return (
				<div key={i}>
					<Link to={item.link}>
						<LazyImage src={item.bannerUrl}
						           alt={item.title}
						           key={i}
						           className='center-block'/>
					</Link>
				</div>
			)
		}) || props.navList;

	return (
		<div>
			{(displayItems.length > 0) &&
				<ReactSlick {...SETTINGS} className={props.slickClass}>
					{displayItems}
				</ReactSlick>
			}
		</div>
	);
};

Slider.propTypes = {
	banners: React.PropTypes.array,
	navList: React.PropTypes.node,
	enableAutoplay: React.PropTypes.bool,
	enableLazyLoad: React.PropTypes.bool,
	enableSwipe: React.PropTypes.bool,
	infinite: React.PropTypes.bool,
	itemsToScroll: React.PropTypes.number,
	noItemsToShow: React.PropTypes.number,
	showArrows: React.PropTypes.bool,
	showDots: React.PropTypes.bool,
	speed: React.PropTypes.number,
	slickClass: React.PropTypes.string
};

Slider.defaultProps = {
	banners: [],
	navList: [],
	enableAutoplay: false,
	enableLazyLoad: true,
	enableSwipe: false,
	infinite: true,
	itemsToScroll: 1,
	noItemsToShow: 1,
	showArrows: false,
	showDots: false,
	speed: 500
};

export default Slider;



