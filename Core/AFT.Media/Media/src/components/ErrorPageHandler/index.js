/**
 * Created by gian.jamisola on 6/13/2017.
 */

import React from 'react';

import { LinkBtnRed } from 'comp/Button';

import styles from './errorpagehandler.scss';

class ErrorPageHandler extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        (() => {
            $("body").css({
                "background": `url(${window.cmsMedia("Content/images/404bg.jpg")})`,
                "background-size": "cover !important",
                "background-repeat": "no-repeat !important",
            });
        })();
    }

    componentWillUnmount() {
        (() => {
            $("body").css({
                "background": "black",
                "background-size": "initial !important",
                "background-repeat": "initial !important",
            });
        })();
    }

    render() {
        return (
            <div className={`${styles.containerHeight} ${styles.header}`}>
                <img className={`${styles.containerHeight}`} src={window.cmsMedia("Content/images/_bvs/logo.svg")} alt=""/>
                <div className={styles.adjustTop}>
                    <img src={window.cmsMedia("Content/images/404-img.png")} className={styles.img404}/>
                    <LinkBtnRed className={`col-xs-2 ${styles.btnPosition}`}
                             text="Click here to go back to home"/>
                </div>
            </div>

        )
    }
}

export default ErrorPageHandler;