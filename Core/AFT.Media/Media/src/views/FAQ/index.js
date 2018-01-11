/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import format from 'string-format';

import { Link } from 'react-router';

import iCommon from './common';

class FAQ extends React.Component {

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
		this.props.getText('sidebarHelp', "FAQs");

		this._getStaticContent();
	}

	_getStaticContent() {
		$.ajax({
			url: `${window.cmsMedia("Content/static-pages/faqs.html")}`,
			dataType: 'html',
			type: 'GET'
		}).done((res) => {


			this.setState({content: format(res, window.siteName, <Link to={`/${window.cultureCode}/responsiblegambling`}/>, <Link to={`/${window.cultureCode}/depositandwithdrawal`}/>)}, () => {
				let tmpArr = document.getElementsByClassName('notify-yellow');
				for(let x of tmpArr)
				{
					x.addEventListener('click', function(e){
						e.target.classList.toggle('glyphicon-chevron-down')
					});
				}
			});
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

export default FAQ;