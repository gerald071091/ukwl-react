/**
 * Created by isabella.inosantos on 6/8/2017.
 */

import React from 'react';
import RDatePicker from 'react-datepicker';

const EMPTYFUNC = () => {};

let DatePicker = (props) => {



	return (
		<RDatePicker
			calendarClassName={props.calendarClassName || "rasta-stripes"}
			className={`form-control ${props.className || ''}`}
			dateFormat={props.dateFormat || "YYYY/MM/DD"}
			disabled={props.disabled || false}
			dropdownMode={props.dropdownMode || "select"}
			fixedHeight={true}
			id={props.id || ''}
			onChange={props.onChange || EMPTYFUNC}
			popoverTargetAttachment={props.popoverTargetAttachment || "bottom center"}
			selected={props.selected}
		/>
	)
};

DatePicker.propTypes = {
	calendarClassName: React.PropTypes.string,
	className: React.PropTypes.string,
	dateFormat: React.PropTypes.string,
	disabled: React.PropTypes.bool,
	dropdownMode: React.PropTypes.string,
	id: React.PropTypes.string,
	onChange: React.PropTypes.func,
	popoverTargetAttachment: React.PropTypes.string,
	selected: React.PropTypes.object
};

export default DatePicker;