/**
 * Created by gian.jamisola on 5/31/2017.
 */

import React from 'react';
import { browserHistory } from 'react-router';

class AuthenticatedContainer extends React.Component {
    static propTypes = {
        children: React.PropTypes.node
    }

    constructor(props) {
        super(props);
    }

    state = {
        isAuthenticated: window.authed,
        currentURL: window.location.pathname
    }

    componentDidMount() {
        if (!this.state.isAuthenticated) {
            browserHistory.replace("/en-gb")
        }
    }

    render() {
        if (this.state.isAuthenticated) {
            return this.props.children
        }

        return null

    }
}

export default AuthenticatedContainer;