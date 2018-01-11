/**
 * Created by isabella.inosantos on 5/10/2017.
 */

import React from 'react';
import RCTooltip from 'rc-tooltip';
//import styles from './tooltip.scss'
//const emptyFunc = () => {};

let Tooltip = (props) => {

    return(
        <div>
            <RCTooltip
                placement={props.placement}
                mouseLeaveDelay={props.mouseLeaveDelay}
                overlay={props.overlay}
                overlayStyle={props.overlayStyle}
                trigger={props.trigger}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
            >
                {props.children || ''}
            </RCTooltip>
        </div>

    );
};

Tooltip.propTypes = {
    children: React.PropTypes.node,
    mouseLeaveDelay: React.PropTypes.number,
    overlayStyle: React.PropTypes.string,
    placement: React.PropTypes.string,
    overlay: React.PropTypes.string,
    trigger: React.PropTypes.string
};


export default Tooltip;