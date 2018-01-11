/**
 * Created by isabella.inosantos on 6/1/2017.
 */


import { root } from 'nls/common.js';

let localCommon = {
	title: "Title",
	firstName: "First Name",
	middleName: "Middle Name",
	lastName: "Last Name",
	dateOfBirth: "Date of Birth",
	email: "Email",
	nationality: "Nationality",
	country: "Country",
	addressLine: "Address Line",
	city: "City",
	postcode: "Postcode",
	selAddress: "Select Address",
	mobileNumber: "Mobile Number",
	username: "Username",
	password: "Password",
	confirmPassword: "Confirm Password",
	securityQuestion: "Security Question",
	securityAnswer: "Security Answer",
	bettingCurrency: "Betting Currency",
	marketingPreferences: "Marketing Preferences",
	pDetails: "Personal Details:",
	lDetails: "Login Details:",
	declaration: "Declaration:",
	defaultCountryCode: "GB",
	//**Birthdate placeholders
	dayTitle: 'Day*',
	monthTitle: 'Month*',
	yearTitle: 'Year*',
	dayMobileTitle: 'DD*',
	monthMobileTitle: 'MM*',
	yearMobileTitle: 'YY*',


	//**SECURITY QUESTIONS
	petName: "First Pet",
	streetName: "First Street Name",
	mothersLastName: "Mother's Maiden Name",
	sisterInlaw: "Sister in Law's Name",
	firstCar: "Colour of First Car",
	//**TITLES
	titleMR: "Mr.",
	titleMRS: "Mrs.",
	titleMS: "Ms.",
	titleDR: "Dr.",
};

let combined = Object.assign({}, root, localCommon);

let getValue = (code) => combined[code];

export default getValue;