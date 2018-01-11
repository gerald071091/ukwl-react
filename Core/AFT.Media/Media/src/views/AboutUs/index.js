/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import format from 'string-format';

import iCommon from './common';

class AboutUs extends React.Component {

	static propTypes = {
		getText: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._getStaticContent = this._getStaticContent.bind(this);
	}

	state = {
		content: ''
	};

	componentDidMount() {
		this.props.getText('sidebarInfo', "About Us");
		this._getStaticContent();
	}

	_getStaticContent() {
		$.ajax({
			url: `${window.cmsMedia("Content/static-pages/aboutus.html")}`,
			dataType: 'html',
			type: 'GET'
		}).done((res) => {

			this.setState({content: format(res, window.siteName, window.registeredAddress, window.supportEmail)});
		});
	}

	render() {
		return(
			<div>
				<h2 className="mainTitle">{iCommon('headerTitle')}</h2>
				<div dangerouslySetInnerHTML={{ __html: this.state.content }} />
			</div>
		);
	}
}

export default AboutUs;