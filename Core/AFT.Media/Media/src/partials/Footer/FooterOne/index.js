import React from 'react';
import {Link} from 'react-router';
import enums from './enums'
import styles from './footerOne.scss';

let Footer = () => {
    const LICENSEICONSDATA = enums.LicenseIcons(),
             FOOTERONEDATA = enums.FooterNavOne(),
             FOOTERTWODATA = enums.FooterNavTwo(),
           FOOTERTHREEDATA = enums.FooterNavThree();

    return(
        <div className={`footer ${styles.container}`}>
            <div className={`${styles.payment}`}>
                <img src={window.cmsMedia("Content/images/paymentMethods/payment-01.png")} />
                <img src={window.cmsMedia("Content/images/paymentMethods/payment-02.png")} />
                <img src={window.cmsMedia("Content/images/paymentMethods/payment-03.png")} />
                <img src={window.cmsMedia("Content/images/paymentMethods/payment-05.png")} />
            </div>
            <div className={styles.vendors}>
                <ul>
                    {
                        LICENSEICONSDATA.map((data, i) => {
                            return (
                                <li key={i}>
                                    <a target="_blank" href={data.link}><img src={`${window.cmsMedia(data.src)}`} style={data} /></a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className={styles.sitemap}>
                <div className="row">
                    <div className="col-xs-6">
                        <div className="row">
                            <div className="col-xs-6">
                                <Link to="/en-gb">
                                 <img src={window.cmsMedia("Content/images/_bvs/logo.svg")} />
                                </Link>
                            </div>
                            <div className="col-xs-6">
                                <a href="mailto:support@betvision.com" className="pull-right">{window.supportEmail}</a>
                                <i className={`${styles.faEnvelope} fa fa-envelope pull-right`} />
                            </div>
                        </div>
                        <div>
                            <p>BetVision is powered by TGP Europe Ltd of 2nd Floor Athol House, 21a-23 Athol Street, Douglas, Isle of Man, IM1 1LB. TGP Europe provides software and network services in the Isle of Man under a licence issued to TGP Limited under the Online Gambling Regulations Act 2001 on 23 September 2012. TGP Europe Ltd is licensed and regulated by the UK Gambling Commission for provision of services to the United Kingdom – Licence Number 122698C . Gambling debts are enforceable in law in the Isle of Man.</p>
                            <p>Under 18s are strictly forbidden from gambling on this website. Underage gambling is an offence.</p>
                        </div>
                    </div>
                    <div className="col-xs-6">
                        <div className="col-xs-8" id={styles.sitemapOne}>
                            <h4>SITE INFORMATION</h4>
                            <ul className="col-xs-6">
                                {
                                    FOOTERONEDATA.map((data, i) => {
                                        return (
                                            <li key={i}>
                                                <Link to={data.link}>{data.text}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                            <ul className="col-xs-6">
                                {
                                    FOOTERTWODATA.map((data, i) => {
                                        return (
                                            <li key={i}>
                                                <Link to={data.link}>{data.text}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col-xs-4" id={styles.sitemapTwo}>
                            <h4>HELP</h4>
                            <ul>
                                {
                                    FOOTERTHREEDATA.map((data, i) => {
                                        return (
                                            <li key={i}>
                                                <Link to={data.link}>{data.text}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;