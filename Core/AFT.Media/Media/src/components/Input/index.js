/**
 * Created by bernard.molina on 4/24/2017.
 */
import React from 'react';
import Tooltip from 'comp/Tooltip';
//import styles from './input.scss'
const EMPTYFUNC = () => {};

let Input = (props) => {
	let showLabel = props.label ?
		<label
			className={props.labelClassName || ''}
			htmlFor={props.id}>{props.label}</label> : '';

	const ERRSPAN = (
		<span
			className={`input-msg-error ${props.errClassName || ''}`}
			style={{ display: 'none' }}>
				{props.errMsg || ''}
		</span>
	);

	const INPUT = (
		<input
			name={props.name || ''}
			type={props.type || 'text'}
			id={props.id || ''}
			className={props.type === 'checkbox' ? `${props.className}` : `form-control ${props.className || ''}`}
			defaultValue={props.defaultValue}
			placeholder={props.placeholder}
			disabled={props.disabled || false}
			defaultChecked={props.defaultChecked ? 'checked' : ''}
			autoComplete="off"
			maxLength={props.maxLength}
			onBlur={props.onBlur || EMPTYFUNC}
			onChange={props.onChange || EMPTYFUNC}
			onClick={props.onClick || EMPTYFUNC}
			onFocus={props.onFocus || EMPTYFUNC}
			onKeyUp={props.onKeyUp || EMPTYFUNC}
			size={props.size}
			style={props.style}/>
	);

	if (props.tooltipMessage) {
		return (
			<div className={props.containerClass}>
				{showLabel}
				<Tooltip
					placement="right"
					mouseLeaveDelay={0}
					overlay={props.tooltipMessage}
					overlayStyle={props.overlayStyle}
					trigger="focus">

					<div>
						{INPUT}
						{props.children || ''}
						{ERRSPAN}
					</div>
				</Tooltip>
			</div>
		);
	}

	return (
		<div className={props.containerClass}>
			{showLabel}
			{INPUT}
			{props.children || ''}
			{ERRSPAN}
		</div>
	);

};

Input.propTypes = {
	name: React.PropTypes.string,
	type: React.PropTypes.string,
	id: React.PropTypes.string,
	className: React.PropTypes.string,
	containerClass: React.PropTypes.string,
	onClick: React.PropTypes.func,
	children: React.PropTypes.node,
	defaultValue: React.PropTypes.string,
	defaultChecked: React.PropTypes.bool,
	errMsg: React.PropTypes.string,
	errClassName: React.PropTypes.string,
	to: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	target: React.PropTypes.string,
	onBlur: React.PropTypes.func,
	onChange: React.PropTypes.func,
	onFocus: React.PropTypes.func,
	onKeyUp: React.PropTypes.func,
	placeholder: React.PropTypes.string,
	label: React.PropTypes.string,
	labelClassName: React.PropTypes.string,
	tooltipMessage: React.PropTypes.string,
	overlayStyle: React.PropTypes.string,
	maxLength: React.PropTypes.number,
	size: React.PropTypes.number,
	style: React.PropTypes.object
};

export default Input;