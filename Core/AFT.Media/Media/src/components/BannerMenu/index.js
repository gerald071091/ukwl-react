/**
 * Created by Marnie.Palapar on 5/8/2017.
 */

import React from 'react';
import { Link } from 'react-router';
import { BtnRed } from 'comp/Button';
import LazyImage from 'comp/LazyImage';
import iCommon from 'nls/common.js';
import styles from './bannerMenu.scss';

let BannerMenu = (props) => {
	return (
		<div className={`${styles.row} center-block`}>

			{props.banners.map((item, i) => {
				let colValue = ((props.banners.length <= 4 && props.banners.length > 1) || props.banners.length === 6) ?
					colValue = 12 / props.banners.length : 6;

				return (
					<div key={i} className={`col-sm-${colValue} ${styles.box}`}>
						<h1>{item.title}</h1>
						<LazyImage src={item.bannerUrl} alt={item.title}/>

						<BtnRed name={iCommon('bPlayNow')}>
							<Link to={`/${window.cultureCode}/${item.link}`}>
								<span>{iCommon('bPlayNow')}</span>
								<i className='fa fa-fw fa-arrow-right'/>
							</Link>
						</BtnRed>
					</div>
				)
			})
			}
		</div>
	)
};

BannerMenu.propTypes = {
	banners: React.PropTypes.array
};

export default BannerMenu;

