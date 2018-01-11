/**
 * Created by bernard.molina on 5/31/2017.
 */
import iCommon from './common';

class Enums {
	neteller = {
		payment: 'World Pay',
		img: 'neteller.png',
		title: 'sample for skrill',
		desc: iCommon('netellerDescription')
	};

	worldpay = {
		payment: 'World Pay',
		img: 'creditcard.png',
		title: 'Debit/Credit Card',
		desc: iCommon('visaDescription')
	};

	skrill = {
		payment: 'Skrill',
		img:'skrill.png',
		title: 'Skrill',
		desc: iCommon('skrillDescription')
	};

	skrillOneTap = {
		payment: 'Skrill',
		img:'skrill-one-tap.png',
		title: 'Skrill 1-Tap',
		desc: iCommon('skrillDescription')

	};
}

export default new Enums();