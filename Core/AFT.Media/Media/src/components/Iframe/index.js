/**
 * Created by gian.jamisola on 5/15/2017.
 */

import React from 'react';
import {Loader} from 'react-loaders';

import styles from './iframe.scss';

//const EMPTYFUNC = () => {};

class Iframe extends React.Component {
    static propTypes = {
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        src: React.PropTypes.string,
        width: React.PropTypes.string,
        height: React.PropTypes.string,
        position: React.PropTypes.string,
        display: React.PropTypes.string,
        onLoad: React.PropTypes.func,
        children: React.PropTypes.node,
    };

    constructor(props){
        super(props);
        this._iframeHasLoaded = this._iframeHasLoaded.bind(this);
    }

    state = {
        isIframeLoaded: false,
        display: 'none'
    };

    componentDidMount() {
        this._iframeHasLoaded();
    }

    _iframeHasLoaded() {
        setTimeout(() => {
            this.setState({isIframeLoaded: true,
                display: 'block'
            });
            document.querySelector(".iframe iframe").style.height = `${this.props.height || '1300px'}`;
            document.querySelector(".iframe div.iframe-msg").style.display = 'none';
        }, 5000);
    }

    render() {
    	// Anton was here
        const ISIFRAMELOADED = this.state.isIframeLoaded;
        const IFRAMESRC = this.props.src;
	    /*const IFRAMESTYLE = {
	    	height: this.props.height,
		    position: this.props.position || 'absolute',
		    display: this.state.display
	    };*/

        return (
            <div id={styles.iframeContainer} className="iframe">
                <iframe
                    id={this.props.id}
                    className={this.props.className}
                    src={IFRAMESRC || ''}
                    width={this.props.width || "100%"}
                    height={this.props.height || "1px"}
                    //style={IFRAMESTYLE}
                    //onLoad={IFRAMESRC ? this._iframeHasLoaded : EMPTYFUNC}
                />

                <div className={`${styles.iframeMsg} iframe-msg text-center`}>
                    <Loader type="line-scale" active={!ISIFRAMELOADED}/>
                </div>
                {this.props.children}
            </div>
        );
    }
}

export default Iframe;
