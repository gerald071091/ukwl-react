/**
 * Created by bernard.molina on 4/19/2017.
 */
import React from 'react';
import rBanners from 'res/banners';
import Slider from 'comp/Slider';
import BannerMenu from 'comp/BannerMenu';
import styles from './home.scss';

class Home extends React.Component {

	static propTypes = {
		getUrl: React.PropTypes.func
	};

	constructor(props) {
		super(props);
		this._getOureaBanners = this._getOureaBanners.bind(this);
	}

	state = {
		homeBanners: [],
		sideBanners: []
	};

	componentDidMount() {
		this.props.getUrl("home");
		this._getOureaBanners("Home", "Sidebanners");
	}

	_getOureaBanners(homeBanner, sideBanner) {
		$.when(
			rBanners.getOureaBanners(homeBanner),
			rBanners.getOureaBanners(sideBanner)
		)
			.done((r1, r2) => {
				if (r1[0].banners.length !== 0 || r2[0].banners.length !== 0) {
					this.setState({
						homeBanners: r1[0].banners,
						sideBanners: r2[0].banners
					});
				}
			})
			.fail((jqXHR, textStatus, errMsg) => {
				console.log(jqXHR, textStatus, errMsg);
			});
	}

	render() {
		return (
			<div>
				<Slider banners={this.state.homeBanners}
				        slickClass={styles.homepageBanner}
				        enableAutoplay={this.state.homeBanners.length > 1 && true}
				/>
				{this.state.sideBanners.length !== 0 ?
					<BannerMenu banners={this.state.sideBanners}/> : <div/>}
			</div>
		);
	}
}

export default Home;