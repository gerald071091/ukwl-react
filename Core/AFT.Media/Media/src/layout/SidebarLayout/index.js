/**
 * Created by isabella.inosantos on 5/5/2017.
 */

import React from 'react';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer/FooterOne';
import Sidebar from '../../partials/Sidebar';
import styles from './sidebarlayout.scss';

class SidebarLayout extends React.Component {
    static propTypes = {
        children: React.PropTypes.node,
        location: React.PropTypes.object
    };

	constructor(props) {
		super(props);
		this._getText = this._getText.bind(this);
		this._populateSidebarMenu = this._populateSidebarMenu.bind(this);
	}

	state = {
		sidebarVal: '',
		activeLink: '',
		menuArray: [],
		sidebarMarkup: ''
	};

	_getText(sidebar, activeLink) {
        this.setState({sidebarVal: sidebar, activeLink: activeLink});
	}

	_populateSidebarMenu(arrayValue) {
		this.setState({menuArray: arrayValue});
	}

	render() {
		const CHILDRENWITHPROPS = React.Children.map(this.props.children,
			(child) => React.cloneElement(child, {
				getText: this._getText,
				populateSidebarMenu: this._populateSidebarMenu
			})
		);

		return (
			<div className={styles.sidebarLayout}>
                <Header />
				<div className={`row ${styles.mainContent}`}>
					<div className={`col-xs-3 ${styles.sidebarContent}`}>
						{this.state.sidebarVal !== "" ? <Sidebar url={this.state.sidebarVal} activeLink={this.state.activeLink} /> : <Sidebar menuArray={this.state.menuArray}/> }
					</div>
					<div className={`col-xs-9 ${styles.rightContent}`}>
						{CHILDRENWITHPROPS}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default SidebarLayout;