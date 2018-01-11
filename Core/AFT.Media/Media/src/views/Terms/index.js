/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';
import iCommon from './common';
import enums from './enums';



class Terms extends React.Component {

	static propTypes = {
		getText: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this._getStaticContent = this._getStaticContent.bind(this);
		this._mapCountries = this._mapCountries.bind(this);
	}

	state = {
		content: '',
		countryContainer: ''
	};

	componentDidMount() {
		this.props.getText('sidebarInfo', iCommon('cntryHeaderTitle'));
		this._getStaticContent();
	}

	_getStaticContent() {
		$.ajax({
			url: `${window.cmsMedia("Content/static-pages/termsAndconditions.html")}`,
			dataType: 'html',
			type: 'GET'
		}).done((res) => {
			console.log(res);

			this.setState({
				content: res
			}, () => {
				let tmp = this._mapCountries();

				document.querySelector("#terms-and-conditions-container p#tnc-countries").innerHTML = tmp;
			});
		});
	}

	_mapCountries() {
	    const GETTEXT = (item) => `<span>&nbsp;${item.text}</span>`,
              COUNTRIES = enums.countries;
		return (
			`<span>
                <strong>9.1&nbsp;</strong>
                Players must not utilise any part of the Website if based in the following Restricted jurisdictions:
                ${COUNTRIES.map(GETTEXT)}
                or any other jurisdiction from where use is so prohibited. We will undertake checks and have third parties undertake checks on our behalf to identify Players from these jurisdictions accessing the Website. Please note that further restrictions on access to certain gaming products available via the Website may apply to Players based in additional jurisdictions, in such cases access to such specific gaming products will be prevented through the Website from within such jurisdictions.
            </span>`
		);
	}

	render() {
		return (
			<div id="terms-and-conditions-container">
				<h2 className="mainTitle">{iCommon('cntryHeaderTitle')}</h2>
				<div dangerouslySetInnerHTML={{ __html: this.state.content }}>
				</div>
			</div>
		);
	}
}

export default Terms;