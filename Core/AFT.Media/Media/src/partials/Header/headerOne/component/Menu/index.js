/**
 * Created by bernard.molina on 5/5/2017.
 */
import React from 'react';
import {Link} from 'react-router';
import styles from './menu.scss';
import enums from '../../../../Header/enums';


let Menu = () => {
	const HEADERTABSDATA = enums.HeaderTabs();
	return (
		<div className={styles.menu}>
			<div>
				<Link to={`/${window.cultureCode}`}>
					<img src={window.cmsMedia("Content/images/_bvs/logo.svg")} />
				</Link>
				<ul>
					{HEADERTABSDATA.map((data, i) => {
						return (
							<li key={i}>
								<Link to={data.link}>{data.text}</Link>
							</li>
						)
					})}

				</ul>
			</div>
		</div>
	)
};

export default Menu;