/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import format from 'string-format';

import iCommon from './common';

class Rules extends React.Component {

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
		this.props.getText('sidebarInfo', "Rules");
		this._getStaticContent();
	}

	_getStaticContent() {
		$.ajax({
			url: `${window.cmsMedia("Content/static-pages/rules.html")}`,
			dataType: 'html',
			type: 'GET'
		}).done((res) => {

			this.setState({content: format(res, window.siteUrl, window.supportEmail, window.siteName)});
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

export default Rules;