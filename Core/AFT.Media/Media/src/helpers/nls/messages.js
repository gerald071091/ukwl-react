/**
 * Created by gian.jamisola on 5/5/2017.
 */

let root = {
    //Error Messages
    errUnExpectedError: "An unexpected error occurred. Please try again later.",
    errNotAuthenticated: "You are not authenticated to perform the operation",
    errPleaseLoginToViewSportsbook: "Please Login to view Sportsbook", // mobile only
    errLoginOrRegister: "Please log in or register to view the Game tables",
    errGameUnavailable: "You are not allowed to use this product.",
    errCanNotLogout: "Cannot logout at the moment. Please try again later. :(",
    errEighteenPlusContent: 'You must be 18 years of age to register and to place a bet. The company reserves the right to ask for proof of age from any customer and the customer accounts may be suspended until satisfactory proof of age is provided.',

    //Form Validation Messages
    fvUsernameLength: "Username length should be from 6 to 12 characters.",
    fvUsernameRequired: "Username is required.",
    fvUsernameAlphanumeric: "Username should be alphanumeric.",
    fvFirstNameRequired: "First name is required.",
    fvFirstNameAlphabetic: "First name should be alphabetic.",
    fvFirstNameLength: "First name should be less than 50 characters.",
    fvLastNameRequired: "Last name is required.",
    fvLastNameAlphabetic: "Last name should be alphabetic.",
    fvLastNameLength: "Last name should be less than 20 characters.",
    fvEmailRequired: "Email is required.",
    fvEmailFormatIncorrect: "Email format is incorrect.",
    fvTelephoneRequired: "Telephone is required.",
    fvTelephoneFormatIncorrect: "Telephone format is incorrect.",
    fvSecurityQuestionRequired: "Security question is required.",
    fvSecurityAnswerRequired: "Security answer is required.",
    fvCheckAllFieldsArePopulated: "Check that all fields are populated.",

    //UNGROUPED (ETC)
    rsgGameCloseConfirm: 'Are you sure you want to close this game?',


    //rego erros

    // Error messages
    errInvalidRequest: "Invalid request.",
    errUnexpectedError: 'An unexpected error occurred. Please try again later or contact our customer service.',
    errUnauthenticatedUser: 'UnauthenticatedUser',
    errNotSupported: 'NotSupported',
    errUrlNotFound: 'UrlNotFound',
    errProductNotFound: "Please choose valid product.",
    errProductNotAvailable: "You are not allowed to use this product.",
    errSessionExpired: "Your session is expired, please log in again.",
    errBlockedIp: "Your IP address is not allowed to log in.",
    errBlockedCountry: "We have detected that you are located in a country from which we do not accept customers. Please contact Customer Services if you are not in one of the countries listed in our Terms of Service.",
    errWrongCredential: "Invalid username or password.",
    errSuspendedUser: "Failed to log in. Your account is suspended.",
    errClosedUser: "Failed to log in. Your account is closed.",
    errInactivatedUser: "InactivatedUser",
    errLoginFailed: "Failed to log in.",
    errInvalidPassword: "Invalid password.",
    errInvalidNewPassword: "Invalid new password.",
    errSamePasswords: "New Password can not be same as old password.",
    errWrongPassword: "Wrong Password.",

    // Withdrawal
    errWithdrawalNotCompleted: "Withdrawal not completed",
    errWithdrawalRestricted: "",

    // Deposit
    errDepositNotCompleted: "Deposit not completed",

    // SignUp
    errDuplicateUsername: "Username already exists. Try another username.",
    errDuplicateEmail: "The email you have entered has already been used.",
    errDuplicateMobileNumber: "Mobile number is already in use.",
    errIntroducerNotFound: "Introducer not found.",
    errCountryNotFound: "Country not found.",
    errCurrencyNotFound: "Currency not found.",
    errInvalidDateOfBirth: "Invalid date of birth.",

    // Bonus
    errBonusAndBettingBalancesNotFound: "Bonus and betting balances not found",
    errBonusNotClaimed: "Bonus not claimed",

    //Promotion
    errPromotionNotFound: "Promotion not found",

    //Announcement
    errAnnouncementNotFound: "Announcement not found",

    // ResetPassword
    errUserNotFound: "Username is not found.",
    errEmailNotMatched: "Email does not match the user.",
    errSecurityQuestionNotMatched: "Security question does not match the user.",
    errSecurityAnswerNotMatched: "Security answer does not match the user.",
    errResetPasswordFailed: "Failed to reset password.",

    // Utility
    errBannerNotHit: "Banner not hit",
    errQueryNotSent: "Failed to send your query. Please try again later.",

    // Terms and Conditions
    errTermsNotRead: "Terms not read",
    errTermsNotAccepted: "Terms not accepted",

    // MyAccount
    errUnableToGetDepositLimit: "Unable to get deposit limit",
    errUnableToSetDepositLimit: "Unable to set deposit limit",
    errUnableToConfirmDepositLimit: "Unable to confirm deposit limit",


};

let getValue = (code) => root[code];

export default getValue;
export {root};