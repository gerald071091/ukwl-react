/**
 * Created by isabella.inosantos on 5/11/2017.
 */

import React from 'react';
import Tooltip from 'comp/Tooltip';

const EMPTYFUNC = () => {};

let Select = (props) => {
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

	const SELECT = (
		<select
			id={props.id || ''}
			className={ `form-control ${props.className || ''}`}
			defaultValue={props.defaultValue}
			disabled={props.disabled || false}
			onChange={props.onChange || EMPTYFUNC}
			onClick={props.onClick || EMPTYFUNC}
			onFocus={props.onFocus || EMPTYFUNC}
			size={props.size || ''}>

			{
				props.options.map((data, i) => {
					return (
						<option key={i} value={data[props.pKey] || i}>
							{data[props.value]}
						</option>
					)
				})
			}
		</select>
	);

	if (props.tooltipMessage) {
		return (
			<div>
				{showLabel}
				<Tooltip
					placement="right"
					overlay={props.tooltipMessage}
					trigger="focus"
					overlayStyle={props.styles}>
					<div>
						{SELECT}
						{ERRSPAN}
					</div>
				</Tooltip>

				{props.children || ''}


			</div>
		);
	}

	return (
		<div>
			{showLabel}
			{SELECT}
			{props.children || ''}
			{ERRSPAN}
		</div>
	);

};

Select.propTypes = {
	type: React.PropTypes.string,
	id: React.PropTypes.string,
	className: React.PropTypes.string,
	onClick: React.PropTypes.func,
	children: React.PropTypes.node,
	defaultValue: React.PropTypes.string,
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
	styles: React.PropTypes.string,
	size: React.PropTypes.string,
	options: React.PropTypes.array,
	pKey: React.PropTypes.string,
	value: React.PropTypes.string,
	errClassName: React.PropTypes.string,
	errMsg: React.PropTypes.string
};

export default Select;