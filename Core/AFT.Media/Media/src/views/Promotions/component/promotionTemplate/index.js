/**
 * Created by gian.jamisola on 6/15/2017.
 */


import React from 'react';
import { LinkBtnRed } from 'comp/Button';

import styles from '../../promotions.scss';

class PromotionTemplate extends React.Component {
    static propTypes = {
        list: React.PropTypes.array,
        promotionID: React.PropTypes.string,
        getPromotionDetail: React.PropTypes.func,
        promotionDetails: React.PropTypes.object
    }

    constructor(props) {
        super(props);

        this._mountPromotions = this._mountPromotions.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const PROMOTIONID = nextProps.promotionID;
        if(nextProps.promotionID !== this.props.promotionID) {
            this.props.getPromotionDetail(PROMOTIONID)
        }
    }

    shouldComponentUpdate(nextProps) {
        return (
            nextProps.promotionDetail !== this.props.promotionDetails ||
            nextProps.promotionID !== this.props.promotionID
        )
    }

    _mountPromotions(data, promoID) {
        const PROMOTIONS = data;
        let tmpMarkup = '';
        if(PROMOTIONS.length > 0 && !promoID) {
            tmpMarkup = PROMOTIONS.map((elem, key) => {
                return (
                    <div key={key} className={styles.promotionTemplate}>
                        <img src={elem.imageUrl}/>
                        <h3 className="mainTitle">{elem.displayName}</h3>
                        <p dangerouslySetInnerHTML={{__html: elem.terms}}></p>
                        <LinkBtnRed to={`promotions/${elem.id}`}
                                    className={`col-xs-2 pull-right ${styles.learnMoreBtn}`} >
                            Learn More
                        </LinkBtnRed>
                    </div>
                )
            });
        } else {
            return (
                <div className={styles.promotionTemplate}>
                    <img src={PROMOTIONS.imageUrl}/>
                    <p dangerouslySetInnerHTML={{__html: PROMOTIONS.terms}}></p>
                </div>
            )
        }

        return tmpMarkup;
    }

    render() {
        let promoData = (Object.keys(this.props.promotionDetails).length !== 0) ? this.props.promotionDetails : this.props.list;
        let promoMarkup = this._mountPromotions(promoData, this.props.promotionID);

        return(
            <div>{promoMarkup}</div>
        )
    }
}

export default PromotionTemplate;