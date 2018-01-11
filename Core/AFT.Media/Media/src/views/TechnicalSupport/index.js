/**
 * Created by isabella.inosantos on 5/4/2017.
 */

import React from 'react';

import iCommon from './common';

class TechnicalSupport extends React.Component {

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
        this.props.getText('sidebarHelp', "Technical Support");
        this._getStaticContent();
    }

    _getStaticContent() {
        $.ajax({
            url: `${window.cmsMedia("Content/static-pages/technicalSupport.html")}`,
            dataType: 'html',
            type: 'GET'
        }).done((res) => {
            console.log(res);

            this.setState({content: res});
        });
    }

    render() {
        return(
            <div>
                <h2 className="mainTitle">{iCommon('headerTitle')}</h2>
                <div dangerouslySetInnerHTML={{ __html: this.state.content }} />
                <p>For all Technical Support questions please email us at <a href={`mailto:${window.supportEmail}`}>{window.supportEmail}</a>.</p>
            </div>
        );
    }
}

export default TechnicalSupport;