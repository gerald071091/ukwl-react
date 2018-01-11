/**
 * Created by bernard.molina on 5/2/2017.
 */
import React from 'react';
import enums from '../enums';
import {Link} from 'react-router';
import styles from './header.scss';
import Login from './component/Login';
import Menu from './component/Menu';
import PlayerMenu from './component/PlayerMenu';


let HeaderOne = (props) => {
	const HEADERTOPDATA = enums.HeaderTopNav();
	let isLogin = window.authed ?
		<PlayerMenu logout={props.logout} path={props.path}/> :
		<Login data={props.data} />;

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.leftHeader}>
					{
						HEADERTOPDATA.map((data, i) => {
							let showSpan = data.border ? <span /> : '';

							return(
								<div key={i}>
									<Link to={data.link}>
										{data.text}
									</Link>
									{showSpan}
								</div>
							)
						})
					}
				</div>

				{isLogin}
				<div className="clear" />
			</div>

			<Menu />
		</div>
	)
};

HeaderOne.propTypes = {
	data: React.PropTypes.func,
	logout: React.PropTypes.func,
	path: React.PropTypes.string
};


export default HeaderOne;
