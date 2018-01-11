/**
 * Created by isabella.inosantos on 5/2/2017.
 */

import React from 'react';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer/FooterOne';

class Layout extends React.Component {
	static propTypes = {
		children: React.PropTypes.node
	};

	constructor(props) {
        super(props);

		this._getUrl = this._getUrl.bind(this);
    }

    state = {
        currentPath: ''
    };

    _getUrl(url) {
    	this.setState({ currentPath: url });
    }

    render() {
	    const CHILDRENWITHPROPS = React.Children.map(this.props.children,
		    (child) => React.cloneElement(child, {
			    getUrl: this._getUrl
		    })
	    );

        return(
            <div>
                <Header path={this.state.currentPath}/>
				<div className="clear" />
                {CHILDRENWITHPROPS}
                <Footer />
            </div>
        );
    }
}

export default Layout;