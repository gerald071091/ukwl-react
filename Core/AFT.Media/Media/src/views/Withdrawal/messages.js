/**
 * Created by gian.jamisola on 6/1/2017.
 */

let root = {
    successMessage: "Your withdrawal request has been submitted for verification. Please wait for 24-48 hours to process your transaction.",

    errHasNotYetDeposited: "You have not yet deposited any amount.",
    errFailInitializingPage: "Failed to initialize withdrawal page, please contact support for the issue.",

    v_amount_required: "Amount is required",
    v_amount_isNumber: "Please enter only numbers for amount",
    v_amount_min: "The amount you entered is below the minimum amount allowed.",
    v_amount_invalid: "The amount you entered is invalid.",
    v_amount_greaterThenBalance: "Invalid amount specified",

    v_neteller_netellerId_required: "Account Id is required.",

    v_skrill_email_required: "Skrill email is required.",

    v_worldPay_card_required: "Credit Card number is required.",
    v_worldPay_expYY_required: "Expiry Year is required",
    v_worldPay_expYY_pattern: "Invalid Expiry Year",
    v_worldPay_expMM_required: "Expiry Month is required",
    v_worldPay_expMM_pattern: "Invalid Expiry Month",
    v_worldPay_cvv_reqired: "The CVV2 field is required.",
    v_worldPay_cvv_pattern: "Invalid Secure code",
}

let getValue = (code) => root[code];

export default getValue;