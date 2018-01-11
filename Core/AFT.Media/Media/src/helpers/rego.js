/**
 * Created by isabella.inosantos on 4/26/2017.
 */

import utils from './utils';
import iMessage from 'nls/messages';

class Rego {
    ajax(opts) {
        let def = {
            cache: false,
            dataType: 'json',
            beforeSend: function (xhr) {
                xhr.setRequestHeader(window.csrfTokenName, window.csrfToken);
                utils.xhrPool.push(xhr);
            }
        };
        def = $.extend(def, opts);

        let ajax = $.ajax(def);

		return ajax
			.then((data, textStatus, jqXhr) => { // Modify promises when common error happens, catch them in fail() block
				switch (data.code) {
					case "Success":
					case "Pending3DSecure":
					return ajax;

					case 'SessionExpired':
					if (utils.isFunction(utils.handleSessionExpired)) {
						utils.handleSessionExpired(iMessage('errSessionExpired'));
					}
					return $.Deferred().reject(jqXhr, data, iMessage('errSessionExpired')).promise();

					case 'DeactivatedAccount':
					if (utils.isFunction(utils.handleSessionExpired)) {
					utils.handleSessionExpired(data.errorMessage);
					}
					return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();

					case "LoginFailed": return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();
					case 'InvalidRequest': return $.Deferred().reject(jqXhr, data, iMessage('errInvalidRequest')).promise();
					case "LoginMaxAttemptsFailed": return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();
					case 'UnexpectedError': return $.Deferred().reject(jqXhr, data, iMessage('errUnexpectedError')).promise();
					case 'UnauthenticatedUser': return $.Deferred().reject(jqXhr, data, iMessage('errUnauthenticatedUser')).promise();
					case 'NotSupported': return $.Deferred().reject(jqXhr, data, iMessage('errNotSupported')).promise();
					case "BrokenApiProxy": {
					//var msg = data.errorMessage === undefined || data.errorMessage === "" ? iMessage('errUnexpectedError') : data.errorMessage;
					let msg = data.errorMessage === undefined || data.errorMessage === "" ? data.message : data.errorMessage;
					msg = msg === undefined || msg === "" ? iMessage('errUnexpectedError') : msg;
					if (utils.isFunction(utils.handleBrokenApiProxy)) {
					utils.handleBrokenApiProxy(msg);
					}
					return $.Deferred().reject(jqXhr, data, msg).promise();
					}

					case "InvalidPlayerStatus": return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();
					case "UrlNotFound": return $.Deferred().reject(jqXhr, data, iMessage('errUrlNotFound')).promise();
					case "ProductNotFound": return $.Deferred().reject(jqXhr, data, iMessage('errProductNotFound')).promise();
					case "ProductNotAvailable": return $.Deferred().reject(jqXhr, data, iMessage('errProductNotAvailable')).promise();
					case "BlockedIP": return $.Deferred().reject(jqXhr, data, iMessage('errBlockedIp')).promise();
					//case 'BlockedCountry': return $.Deferred().reject(jqXhr, data, iMessage('errBlockedCountry')).promise();
					case 'SelfExcludedUser': return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();
					//case "WrongCredential": return $.Deferred().reject(jqXhr, data, iMessage('errWrongCredential')).promise();
					//case "SuspendedUser": return $.Deferred().reject(jqXhr, data, iMessage('errSuspendedUser')).promise();
					//case "ClosedUser": return $.Deferred().reject(jqXhr, data, iMessage('errClosedUser')).promise();
					//case "InactivatedUser": return $.Deferred().reject(jqXhr, data, iMessage('errInactivatedUser')).promise();
					case "InvalidPassword": return $.Deferred().reject(jqXhr, data, iMessage('errInvalidPassword')).promise();
					case "InvalidNewPassword": return $.Deferred().reject(jqXhr, data, iMessage('errInvalidNewPassword')).promise();
					case "SamePasswords": return $.Deferred().reject(jqXhr, data, iMessage('errSamePasswords')).promise();
					case "WrongPassword": return $.Deferred().reject(jqXhr, data, iMessage('errWrongPassword')).promise();

					// Withdrawal
					case "WithdrawalNotCompleted": return $.Deferred().reject(jqXhr, data, iMessage('errWithdrawalNotCompleted')).promise();

					case "WitdrawalRestricted": return $.Deferred().reject(jqXhr, data, iMessage('errWithdrawalRestricted')).promise();

					// Deposit
					case "DepositNotCompleted":
					if (data.errorMessage === undefined || data.errorMessage === '') {
					return $.Deferred().reject(jqXhr, data, iMessage('errDepositNotCompleted')).promise();
					}
					return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();


					case "WorldPayResetError": return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();
					case "WorldPayDepositFastPayCardError": return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();

					// SignUp
					case "DuplicateUsername": return $.Deferred().reject(jqXhr, data, iMessage('errDuplicateUsername')).promise();
					case "DuplicateEmail": return $.Deferred().reject(jqXhr, data, iMessage('errDuplicateEmail')).promise();
					case "DuplicateMobileNumber": return $.Deferred().reject(jqXhr, data, iMessage('errDuplicateMobileNumber')).promise();
					case "IntroducerNotFound": return $.Deferred().reject(jqXhr, data, iMessage('errIntroducerNotFound')).promise();
					case "CountryNotFound": return $.Deferred().reject(jqXhr, data, iMessage('errCountryNotFound')).promise();
					case "CurrencyNotFound": return $.Deferred().reject(jqXhr, data, iMessage('errCurrencyNotFound')).promise();
					case "InvalidDateOfBirth": return $.Deferred().reject(jqXhr, data, iMessage('errInvalidDateOfBirth')).promise();
					case "BadData": return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();
					case "IovationDenied": return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();
					// Bonus
					case "BonusAndBettingBalancesNotFound": return $.Deferred().reject(jqXhr, data, iMessage('errBonusAndBettingBalancesNotFound')).promise();
					case "BonusNotClaimed": return $.Deferred().reject(jqXhr, data, iMessage('errBonusNotClaimed')).promise();
					// Promotion
					case "PromotionNotFound": return $.Deferred().reject(jqXhr, data, iMessage('errPromotionNotFound')).promise();
					// Announcement
					case "AnnouncementNotFound": return $.Deferred().reject(jqXhr, data, iMessage('errAnnouncementNotFound')).promise();
					// Payment
					case "TransactionError": return $.Deferred().reject(jqXhr, data, iMessage('errTransactionError')).promise();
					case "VoucherNotActivated": return $.Deferred().reject(jqXhr, data, iMessage('errVoucherNotActivated')).promise();
					// Product
					case "SameWallet": return $.Deferred().reject(jqXhr, data, iMessage('errSameWallet')).promise();
					case "TransferNotCompleted": return $.Deferred().reject(jqXhr, data, iMessage('errTransferNotCompleted')).promise();
					// ResetPassword
					case "UserNotFound": return $.Deferred().reject(jqXhr, data, iMessage('errUserNotFound')).promise();
					case "EmailNotMatched": return $.Deferred().reject(jqXhr, data, iMessage('errEmailNotMatched')).promise();
					case "SecurityQuestionNotMatched": return $.Deferred().reject(jqXhr, data, iMessage('errSecurityQuestionNotMatched')).promise();
					case "SecurityAnswerNotMatched": return $.Deferred().reject(jqXhr, data, iMessage('errSecurityAnswerNotMatched')).promise();
					case "ResetPasswordFailed": return $.Deferred().reject(jqXhr, data, iMessage('errResetPasswordFailed')).promise();
					// Utility
					case "QueryNotSent": return $.Deferred().reject(jqXhr, data, iMessage('errQueryNotSent')).promise();
					// Terms and Conditions
					case "TermsNotRead": return $.Deferred().reject(jqXhr, data, iMessage('errTermsNotRead')).promise();
					case "TermsNotAccepted": return $.Deferred().reject(jqXhr, data, iMessage('errTermsNotAccepted')).promise();
					case "UnableToGetDepositLimit": return $.Deferred().reject(jqXhr, data, iMessage('errUnableToGetDepositLimit')).promise();
					case "UnableToSetDepositLimit": return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();
					case "UnableToConfirmDepositLimit": return $.Deferred().reject(jqXhr, data, data.errorMessage).promise();
					//default:
					//    var msg = data.errorMessage === undefined || data.errorMessage === "" ? iMessage('errUnexpectedError : data.errorMessage;
					//    if (utils.isFunction(utils.handleBrokenApiProxy)) {
					//        utils.handleBrokenApiProxy(msg);
					//    }
					//    return $.Deferred().reject(jqXhr, data, msg).promise();
					case "Failed": return $.Deferred().reject(jqXhr, data, data.message).promise();

					default : return $.Deferred().reject(jqXhr, data, data.message).promise();
				}
				})
				.fail((jqXhr, data, st) => {
					let errorPage = 401;

					switch (jqXhr.status) {
						case errorPage:
						if (utils.isFunction(utils.handleUnAuthed)) {
						utils.handleUnAuthed(iMessage('errSessionExpired'));
					}
					return $.Deferred().reject(jqXhr, data, st).promise();
					default:
					return $.Deferred().reject(jqXhr, data).promise();
					//    var msg = data.errorMessage === undefined || data.errorMessage === "" ? iMessage('errUnexpectedError : data.errorMessage;
					//    if (utils.isFunction(utils.handleBrokenApiProxy)) {
					//        utils.handleBrokenApiProxy(msg);
					//    }
					//    return $.Deferred().reject(jqXhr, data, msg).promise();
					}
				});
    }

}

export default new Rego();