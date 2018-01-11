/**
 * Created by bernard.molina on 5/3/2017.
 */
import React from 'react';
import { Link } from 'react-router';
import styles from './button.scss';

const emptyFunc = () => {};

const Btn = (props) => {
	return (
		<button
			className={`btn ${props.color || styles.btnGreen} ${props.className || ''}`}
			id={props.id || ''}
			name={props.name || ''}
			onClick={props.onClick || emptyFunc}
			onMouseDown={props.onMouseDown || emptyFunc}
			data-toggle={props.dataToggle || ''}
			data-value={props.dataValue || ''}
			data-key={props.dataKey || ''}
			disabled={props.disabled || false}>
			{props.children || ''}
			{props.text || ''}
		</button>
	);
};

Btn.propTypes = {
	color: React.PropTypes.string,
	className: React.PropTypes.string,
	id: React.PropTypes.string,
	name: React.PropTypes.string,
	onClick: React.PropTypes.func,
	onMouseDown: React.PropTypes.func,
	dataToggle: React.PropTypes.func,
	dataValue: React.PropTypes.string,
	dataKey: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	children: React.PropTypes.node,
	text: React.PropTypes.string
};

const LinkBtn = (props) => {
	if (props.href) {
		return (
			<a
				href={props.href}
				className={`btn ${props.color || styles.btnGreen} ${props.className || ''}`}
				onClick={props.onClick || emptyFunc}
				disabled={props.disabled || false}
				target={props.target || '_self'}>
				{props.children}
				{props.text}
			</a>
		);
	}

	return (
		<Link
			to={`/${window.cultureCode}/${props.to}` || `/${window.cultureCode}/`}
			className={`btn ${props.color || styles.btnGreen} ${props.className || ''}`}
			onClick={props.onClick || emptyFunc}
			disabled={props.disabled || false}>
			{props.children}
			{props.text}
		</Link>
	);
};
LinkBtn.propTypes = {
	href: React.PropTypes.string,
	color: React.PropTypes.string,
	className: React.PropTypes.string,
	onClick: React.PropTypes.func,
	children: React.PropTypes.node,
	text: React.PropTypes.string,
	to: React.PropTypes.string,
	disabled: React.PropTypes.string,
	target: React.PropTypes.string
};
/** Buttons */
let BtnGreen = (props) => <Btn color={styles.btnGreen} {...props} />,
	BtnRed = (props) => <Btn color={styles.btnRed} {...props} />,
	BtnBlue = (props) => <Btn color={styles.btnBlue} {...props} />,
	BtnWhite = (props) => <Btn color={styles.btnWhite} {...props} />;

/** Link Buttons */
let LinkBtnGreen = (props) => <LinkBtn color={styles.btnGreen} {...props}/>,
	LinkBtnRed = (props) => <LinkBtn color={styles.btnRed} {...props}/>,
	LinkBtnBlue = (props) => <LinkBtn color={styles.btnBlue} {...props}/>;


export {
	BtnGreen,
	BtnRed,
	BtnBlue,
	BtnWhite,

	LinkBtnGreen,
	LinkBtnRed,
	LinkBtnBlue
};