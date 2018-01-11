/**
 * Created by gian.jamisola on 5/5/2017.
 */

import iCommon from './common';

let titles = [
	{ text: `${iCommon('title')}*` },
	{ text: iCommon('titleMR') },
	{ text: iCommon('titleMRS') },
	{ text: iCommon('titleMS') },
	{ text: iCommon('titleDR') }
];

let securityQuestion = [
	{ text: iCommon('petName') },
	{ text: iCommon('streetName') },
	{ text: iCommon('mothersLastName') },
	{ text: iCommon('sisterInlaw') },
	{ text: iCommon('firstCar') }
];

let monthOB = [],
	yearOB = [],
	dayOB = [],
	ctr = 1;

let monthNames = [iCommon('monthTitle'), "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let createMonthOptions = (month, i) => monthOB.push({ id: i, text: month });
monthNames.map(createMonthOptions);

dayOB.push({ id: 0, text: iCommon('dayTitle') });
while (ctr <= 31) {
	dayOB.push({ id: ctr, text: ctr.toString() });
	ctr++;
}

let i = new Date().getFullYear() - 18;
let j = new Date().getFullYear() - 100;

yearOB.push({ id: 0, text: iCommon('yearTitle') });
while (i >= j) {
	yearOB.push({ id: i, text: i.toString() });
	i--;
}

export default { titles, securityQuestion, monthOB, dayOB, yearOB };