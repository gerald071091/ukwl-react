/**
 * Created by gian.jamisola on 5/12/2017.
 */
import React from 'react';
import Iframe from 'comp/iframe';
import rSportsbook from 'res/sportsbook';
import rBanners from 'res/banners';
import utils from 'helpers/utils';
import Slider from 'comp/Slider';
import styles from './sportsbook.scss';

class Sportsbook extends React.Component {

	static propTypes = {
		getUrl: React.PropTypes.func,
		type: React.PropTypes.string
	};

	constructor(props) {
		super(props);
		this._getSbtechURL = this._getSbtechURL.bind(this);
		this._toggleBanner = this._toggleBanner.bind(this);
		this._updateSbHeight = this._updateSbHeight.bind(this);
	}

	state = {
		sbTechUrl: '',
		sbTechUrlHeight: '1px',
		sportsbookBanners: [],
		isToggled: false,
		toggleCaret: 'fa-caret-up'
	};

	componentDidMount() {
		this.props.getUrl("sportsbook");
		this._getBanner();
		this._getSbtechURL();
		this._updateSbHeight();
		this._toggleBanner();
	}

	_getBanner() {
		rBanners.getOureaBanners("Sportsbook")
			.done((response) => {
				if (response !== undefined || response.banners.length !== 0) {
					this.setState({ sportsbookBanners: response.banners });
				}
			})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(jqXHR, textStatus, errMsg);
			});
	}

	_getSbtechURL() {
		const targetQueryString = 'targetUrl';

		rSportsbook.getSbtechUrl(window.isMobile)
			.done((result) => {
				let targetUrl = utils.getUrlVars()[targetQueryString] || '';
				if (targetUrl !== '') {
					let position = result.url.indexOf('?');
					if (position === -1) {
						result.url = result.url + targetUrl;
					} else {
						result.url = [result.url.slice(0, position), targetUrl, result.url.slice(position)].join('');
					}
				}
				this.setState({
					sbTechUrl: result.url,
					sbTechUrlHeight: '1300px'
				});
			})
			.fail((jqXHR, textStatus, errMsg) => {
				utils.showErrorOnIframe("iframe", errMsg);
			});
	}

	_toggleBanner() {

		if (!this.state.isToggled) {
			$('.slick-slider').animate({ height: 0 }, 450);
			$('.slick-slide img').css("display", "none");

		} else {
			$('.slick-slider').animate({ height: 220 }, 450);
			$('.slick-slide img').css("display", "block");
		}

		this.setState({
			isToggled: !this.state.isToggled,
			toggleCaret: this.state.isToggled ? 'fa-caret-up' : 'fa-caret-down'
		});
	}

	_updateSbHeight() {
		const fixHeight = 1300;
		window.addEventListener('message', function(event) {
			const height = "height";
			let newHeight = event.data[height] > fixHeight ? event.data[height] : fixHeight;
			document.querySelector(".iframe iframe").style.height = newHeight + 'px';
		});
	}

	render() {
		let showProps = this.state.sportsbookBanners.length > 0 && true;

		return (
			<div id={styles.sportsbook} className="center-block">

				<Slider banners={this.state.sportsbookBanners}
				        slickClass={styles.sportsbookBanner}
				        enableAutoplay={showProps}
				        showDots={showProps}
				/>

				<div className={`col-lg-12 ${styles.toggleBanner}`} onClick={this._toggleBanner}>
					<span className={`fa ${this.state.toggleCaret} center-block`} aria-hidden="true"/>
				</div>

				<div className="row">
					<Iframe className="iframe"
					        src={this.state.sbTechUrl}
					        height={this.state.sbTechUrlHeight}
					        position="relative"
					/>
				</div>
			</div>
		)

	}
}

export default Sportsbook;