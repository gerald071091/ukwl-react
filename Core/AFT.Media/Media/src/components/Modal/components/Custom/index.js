/**
 * Created by isabella.inosantos on 5/9/2017.
 */

import React from 'react';
import Modal from 'react-responsive-modal';

const EMPTYFUNC = () => {};

let ModalCustom = (props) => {

    let defaultStyle = {
        height: `${props.height || 'auto'}`,
        overflowY: 'none',
        padding: 0,
        width: `${props.width}%` || '100%'
    };

    return(
        <Modal
            modalClassName={props.modalClassName}
            onClose={props.onClose || EMPTYFUNC}
            overlayClassName=""
            showCloseIcon={true}
            open={props.open}
            modalStyle={props.modalStyle || defaultStyle}
            little>

            <div className="content">
                {props.children}
            </div>
        </Modal>
    );

};

ModalCustom.propTypes = {
	height: React.PropTypes.number,
	width: React.PropTypes.number,
	modalClassName: React.PropTypes.string,
	open: React.PropTypes.bool,
	modalStyle: React.PropTypes.object,
	children: React.PropTypes.node,
	onClose: React.PropTypes.func

};

export default ModalCustom;