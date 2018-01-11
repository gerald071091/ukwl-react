/**
 * Created by isabella.inosantos on 5/24/2017.
 */

import React from 'react';
import styles from './mobilelayout.scss';
import SideMenu from './component/SideMenu'
import Header from './component/Header'

class MobileLayout extends React.Component {
	static propTypes = {
		children: React.PropTypes.node
	};

    constructor(props) {
        super(props);

    }

	state = {
		sidebarVal: ''
	};

    render() {
        return(
            <div className={styles.mobileLayout}>
	            <Header />
				<SideMenu />
	            {this.props.children}
            </div>
        );
    }
}

export default MobileLayout;