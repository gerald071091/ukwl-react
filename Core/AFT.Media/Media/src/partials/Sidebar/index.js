/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import { Link } from 'react-router';
import enums from './enums'
import styles from './sidebar.scss';


class Sidebar extends React.Component {
	static propTypes = {
		url: React.PropTypes.string,
		activeLink: React.PropTypes.string,
		menuArray: React.PropTypes.array
	};

	constructor(props) {
		super(props);

		this._mountSidebar = this._mountSidebar.bind(this);
	}

	_mountSidebar() {
		let arrElement = this.props.url;

		if (arrElement === 'sidebarSettings') {
			return (
				enums[arrElement].map((data, i) => {
					return (
						<li key={i} className={styles.sidebarHeader}>
							<h4>{data.text}</h4>
							<ul>
								{
									data.subMenu.map((data, i) => {
										let activeLink = (data.text === this.props.activeLink) ? `${styles.activeLink}` : '';
										return (
											<li key={i} className={styles.sidebarSettings}>
												<Link to={data.link} activeClassName={activeLink}>{data.text}</Link>
											</li>
										)
									})
								}
							</ul>
						</li>
					)
				})
			)
		}

		return (
			enums[this.props.url].map((data, i) => {
				let activeLink = (data.text === this.props.activeLink) ? `${styles.activeLink}` : '';
				return (
					<li key={i} className={styles.sidebarTitle}>
						<Link to={data.link} activeClassName={activeLink}>{data.text}</Link>
					</li>
				)
			})
		)
	}


	render() {
		let menuArr = this.props.menuArray;

		let modifiedSidebar = () => {
			return (
				menuArr.map((data, i) => {
					let activeLink = (data.id === menuArr[i].id) ? `${styles.activeLink}` : '';
					return (
						<li key={i} className={styles.sidebarTitle}>
							<Link to={`/${window.cultureCode}/promotions/${data.id}`} activeClassName={activeLink}>{data.displayName}</Link>
						</li>
					)
				})
			)
		}

		return (
			<div className={styles.sidebar}>
				<ul>
					{menuArr && modifiedSidebar()}
					{this.props.url && this._mountSidebar()}
				</ul>
			</div>
		);
	}
}

export default Sidebar;