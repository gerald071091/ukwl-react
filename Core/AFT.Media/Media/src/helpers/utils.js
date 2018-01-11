/**
 * Created by gian.jamisola on 5/11/2017.
 */

import iCommon from 'nls/common';
import rAuthentication from 'res/authentication';

import moment from 'moment';

let xhrPool = [],
	mainBalanceInterval = null,
	casinoBalanceInterval = null,
	sportsbookBalanceInterval = null;

class Utils {
	xhrPool = xhrPool;

	isFunction(functionToCheck) {
		let getType = {};
		return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
	}

	roundToDecimal(val) {
		const num = 100;
		return Math.round(new Number(val) * num) / num;
	}

	MSIEversion() {
		const tmp = 0,
			version = 5;
		let userAgent = window.navigator.userAgent,
			msie = userAgent.indexOf("MSIE ");

		if (msie > tmp) {      // If Internet Explorer, return version number
			return parseInt(userAgent.substring(msie + version, userAgent.indexOf(".", msie)));
		}               // If another browser, return 0

		return tmp;
	}

	stopTimeout() {
		this.abortAllAjaxRequests();
		clearInterval(mainBalanceInterval);
		clearInterval(casinoBalanceInterval);
		clearInterval(sportsbookBalanceInterval);
	}

	abortAllAjaxRequests() {
		$.each(xhrPool, (idx, jqXHR) => {
			jqXHR.abort();
		});
		xhrPool = [];
	}

	handleSessionExpired(errMsg) {
		this.stopTimeout();
		//call here resources authentication logout function

		rAuthentication.logout().done(() => {
			window.authed = false;
			this.showModal(errMsg, () => {
				location.replace(window.mainPage);
			});

		});
	}

	handleUnAuthed(errMsg) {
		this.stopTimeout();
		this.showModal(errMsg, () => {
			location.replace(window.mainPage);
		});
	}

	handleBrokenApiProxy() {
		//call modal here
	}

	getUrlVars() {
		const adder = 1,
			tmp = 0;
		let vars = [], hash, i = '',
			hashes = window.location.href.slice(window.location.href.indexOf('?') + adder).split('&');
		for (i = tmp; i < hashes.length; i++) {
			hash = hashes[i].split('=');
			vars.push(hash[0]);
			vars[hash[0]] = hash[1];
		}

		return vars;
	}

	toCurrency(val) {
		console.log(val);
		let n = '',
			decimalPlace = 2,
			empty = 0,
			num = 3;

		if (n === undefined || n === null) {
			n = empty;
		}

		return window.currencySymbol +
			parseInt(n.toString()).toFixed(decimalPlace).replace(/./g, function(c, i, a) {
				return i && c !== "." && !((a.length - i) % num) ? ',' + c : c;
			});
	}

	trim(value) {
		return value ? $.trim(value.replace(/ +/g, ' ')) : '';
	}

	showErrorOnIframe(Message, ClassNode) {
		let message = Message,
			classNode = ClassNode;
		document.querySelectorAll(classNode + " iframe")[0].innerHTML(message);
	}

	addClass(elem, className) {
		if (elem.classList) {
			elem.classList.add(className);
		}
		else {
			elem.className += ' ' + className;
		}
	}

	removeClass(elem, className) {
		if (elem.classList) {
			elem.classList.remove(className);
		}

		else {
			elem.className = elem.className
				.replace(new RegExp('(^|\\b)' +
						className.split(' ').join('|') +
						'(\\b|$)', 'gi'),
					' ');
		}
	}

	addValidClass(elem) {
		let elemError = (elem.parentElement) ?
			$(elem.parentElement.getElementsByClassName('input-msg-error')[0]) : '';
		let checkInput = elem.className.includes('intl-tel-input') ?
			elem.getElementsByClassName('form-control')[0] : elem;

		this.removeClass(checkInput, 'input-error');
		this.addClass(checkInput, 'input-valid');

		(elemError) && elemError.hide();
	}

	addErrorClass(elem, errorMsg) {
		let elemError = (elem.parentElement) ? $(elem.parentElement.getElementsByClassName('input-msg-error')[0]) : '';
		let checkInput = elem.className.includes('intl-tel-input') ? elem.getElementsByClassName('form-control')[0] : elem;

		this.removeClass(checkInput, 'input-valid');
		this.addClass(checkInput, 'input-error');

		(elemError) && elemError.html($.parseHTML(errorMsg) || '');
		(errorMsg && elemError) && elemError.show();
	}

	addValidError(condition, elem, errorMsg) {
		if (condition) {
			this.addValidClass(elem);
		}
		else {
			this.addErrorClass(elem, errorMsg)

		}
	}

	validateDate(condition, elem) {
		if (condition) {
			$(".bdate-err-msg").hide();
			this.removeClass(elem, 'input-error');
			this.addClass(elem, 'input-valid');

		}
		else {
			$(".bdate-err-msg").show();
			this.removeClass(elem, 'input-valid');
			this.addClass(elem, 'input-error');
		}
	}

	showModal(errMsg, callback) {
		//alert(errMsg);
		let wowFunc = () => {
			$('#utilsModal').hide();
			if (this.isFunction(callback)) {
				callback();
			}

		};

		const MODALBODY = (
			`<div id="utilsModal" class="overlay-3765960487">
				<div class="modal-2463794813 utils-modal-content">
					<img src=${window.cmsMedia("Content/images/_bvs/logo.svg")} />
					<h1>${iCommon('cError')}</h1>
					<p>${errMsg}</p>
					<button
						class="btn Media-src-components-Button-___button__btnRed___btnY2"
						id="util-modal-ok">
						${iCommon('cOk')}
					</button>
				</div>
			</div>`
		);
		$(document.body).append(MODALBODY);
		$('#util-modal-ok').click(wowFunc);
	}

	createCookie(name, value, days) {
		let expires = '';
		if(days) {
			const DAYMULTIPLIER = days * 24 * 60 * 60 * 1000;
			let date = moment();
			let tmpDate = moment().add(DAYMULTIPLIER, 'day')
			date.add(tmpDate)
			expires = `; expires=${date.toString()}`
		}

		document.cookie = `${name}=${value}${expires};path=/`;
	}


}

export default new Utils();
