/**
 * Created by isabella.inosantos on 5/9/2017.
 */

import React from 'react';
import ReactModal from 'react-responsive-modal';
//import { BtnGreen } from 'comp/Button';
import { BtnRed } from 'comp/Button';
import Loaders from 'comp/Loader';
import styles from './modal.scss';

const EMPTYFUNC = () => {};

let Modal = (props) => {

	let defaultStyle = {
		height: `${props.height || 'auto'}`,
		overflowY: 'none',
		width: `${props.width}%` || '100%',
		background: 'rgba(0, 0, 0, 0.9)'
	};
	let btnContainer = '';
	let popContainer = '';

	if (props.isConfirm) {
		btnContainer = <div className={styles.btnContainer}>
			<BtnRed onClick={props.click}>
				{props.buttonText}
			</BtnRed>
			<BtnRed onClick={props.closeModal}>
				Cancel
			</BtnRed>
		</div>;
	} else {
		btnContainer = <div className={styles.btnContainer}>
			<BtnRed onClick={props.click}>
				{props.buttonText}
			</BtnRed>
		</div>;
	}

	if (props.isPlain) {
		popContainer = <div className={styles.modalContent}>
			{props.children}
		</div>;
	} else if(props.showLoader){
		popContainer = <div className={styles.modalContent}>
			<Loaders />
		</div>;
	} else {
		popContainer = <div>
			<img src={window.cmsMedia("Content/images/_bvs/logo.svg")}/>
			{props.title ? <h1>{props.title}</h1> : ''}
			<div className={styles.modalContent}>
				{props.children}
			</div>
			{btnContainer}
		</div>;
	}

	return (

		<ReactModal
			modalClassName={`${props.modalClassName} ${styles.modal}` || styles.modal}
			onClose={EMPTYFUNC}
			overlayClassName={props.overlayClassName}
			showCloseIcon={false}
			open={props.open}
			modalStyle={props.modalStyle || defaultStyle}
			little>

			{popContainer}

		</ReactModal>
	);

};

Modal.propTypes = {
	buttonText: React.PropTypes.string,
	children: React.PropTypes.node,
	closeModal: React.PropTypes.func,
	click: React.PropTypes.func,
	height: React.PropTypes.number,
	isConfirm: React.PropTypes.bool,
	isPlain: React.PropTypes.bool,
	showLoader: React.PropTypes.bool,
	modalClassName: React.PropTypes.string,
	modalStyle: React.PropTypes.object,
	open:  React.PropTypes.bool,
	overlayClassName: React.PropTypes.string,
	title: React.PropTypes.string,
	width: React.PropTypes.number
};

export default Modal;