/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';

import PromotionTemplate from './component/promotionTemplate';
import Loaders from 'comp/Loader';

import utils from 'helpers/utils';

import rPromotions from 'res/promotions';

class Promotions extends React.Component {
	static propTypes = {
		getText: React.PropTypes.func,
		populateSidebarMenu: React.PropTypes.func,
		params: React.PropTypes.object,
		location: React.PropTypes.object
	}

	constructor(props) {
		super(props);

		this._getPromotions = this._getPromotions.bind(this);
        this._getPromotionDetail = this._getPromotionDetail.bind(this);
	}

	state = {
		promotions: [],
		promotionDetails: {},
		promotionID: '',
		isLoaderActive: true
	}

	componentWillMount(){
		this._getPromotions();
		this.props.getText('','');

		const BTAG = this.props.location.query.btag;
		const ONEMONTH = 31;
		(BTAG !== 'undefined') && utils.createCookie("btag", BTAG, ONEMONTH)
	}

	componentDidMount() {
		this.props.populateSidebarMenu(this.state.promotions);

		(this.props.params.promotionId && this.setState({promotionID: this.props.params.promotionId}))
	}

    componentWillReceiveProps(nextProps) {
        const PROMOTIONID = nextProps.params.promotionId;
        if(PROMOTIONID) {
            this._getPromotionDetail(PROMOTIONID)
        } else {
            this.setState({promotionID: '', promotionDetails: {} })
        }
    }


    shouldComponentUpdate(nextProps, nextState){
        return (
            nextState.promotions !== this.state.promotions ||
            nextProps.params.promotionId !== this.props.params.promotionId ||
            nextState.promotionDetails !== this.state.promotionDetails
        )
    }

	componentWillUnmount() {
		this.props.getText('','');
	}

	_getPromotions() {
		let callback = (params) => {
			this.props.populateSidebarMenu(params)
			this.setState({isLoaderActive: false})
		}
		rPromotions.getPromotions()
			.done((response) => {
				this.setState({promotions: response.promotions},callback(response.promotions));
			});
	}

	_getPromotionDetail(id) {
		rPromotions.getPromotionDetail(id)
			.done((response) => {
				this.setState({promotionDetails: response.promotion});
			});
	}

	render() {
		let Loader = this.state.isLoaderActive ? <Loaders /> : '';
		return(
			<div>
				<h2 className="mainTitle">Current Promotions</h2>
				{Loader}
				<PromotionTemplate list={this.state.promotions}
								   promotionID={this.state.promotionID}
								   getPromotionDetail={this._getPromotionDetail}
                                   promotionDetails={this.state.promotionDetails}/>
			</div>
		);
	}
}

export default Promotions;