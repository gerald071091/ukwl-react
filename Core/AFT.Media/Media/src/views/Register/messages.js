/**
 * Created by gian.jamisola on 5/5/2017.
 */

let root = {


    errUnExpectedError: "Registration has been unsuccessful due to an unexpected error, please try again later",

    //Form Validation Messages
    titleRequired: "Please select your Title.",

    firstNameRequired: "Please enter your First Name",
    lastNameRequired: "Please enter your Last Name",

    nameMinLength: "Must be at least 2 characters.",
    nameMaxLength: "Must be less than 50 characters.",
    namePattern: "Letters, spaces and special characters: Hyphen (-) and apostrophe (') are allowed.",

    bDateRequired: "Please select your Date of Birth.",
    below18: "You must be 18 years of age to register.",

    emailRequired: "Email is required. Please enter a valid email address.",
    emailInvalidInput: "The email you have input appears to be invalid. Please enter a valid email address.",//------
    emailDuplicate: "The email you have entered has already been used.",//-----!

    nationalityRequired: "Please select your Nationality",

    postalCodeRequired: "Postcode is required. Please enter your postcode.",
    postalCodeIncorrect: "Postcode is incorrect. Please enter your valid postcode.", //-----
    postalCodePattern: "Postal code should be alphanumeric.", //-----

    houseNumberLength: "House number should be less than 10 characters.",

    addressRequired: "Please enter your home address.",
    addressPattern: "Please use letters, numbers and permitted special characters: space(),:;&/-'. Must start with a letter or a number.", //---
    addressLength: "Address length should be less than 50 characters.",

    cityRequired: "Please enter your town/city.",
    cityAlphabetic: "City should be alphabetic.",

    mobileRequired: "Please enter your valid Mobile Number",
    mobileInvalidInput: "You may only use numbers(0-9) and length of 8-15 digits", //-----
    mobileMinLength: "Mobile number must be at least 8 digits.", //-----
    mobileDuplicate: "Mobile number is already in use.",

    usernameRequired: "Please enter your Username. Please use only letters, numbers or period. Length must be 6-12 characters only.",
    usernameLength: "Must be from 6-12 characters only.", //-----
    usernamePattern: "Invalid Username format. Please use only letters, numbers and period. Length must be 6-12 characters only.", //-----
    usernameDuplicate: "Username already exists. Try another username.",

    passwordRequired: "Please enter your password. You may include uppercase, lowercase, numbers or symbols.",
    passwordLength: "Password length should be from 6 to 20 characters only.", //-----
    passwordsDoNotMatch: "Passwords do not match. Please enter your Password again.", //-----

    secAnswerRequired: "Please enter your Answer to the selected Security Question.",
    secAnswerLength: "Security answer should be from 1 to 50 characters.", //-----

    checkRequired: "Check to see if all mandatory fields are input correctly",

    over18Confirmation: "Confirm that you are 18 years old and above.",
    acceptTermsAndConditions: "Read and accept terms and conditions.",

    registerComplete: "Registration Successful! You will receive a welcome email shortly which will contain your Username.",
    ipIsBlocked: "We have detected that you are located in a country from which we do not accept customers. Please contact Customer Services if you are not in one of the countries listed in our Terms of Service.",

    introPar: "Simply tell us about yourself below, then you'll be on your way to playing. Don't forget if you have a question about anything at all, feel free to contact our friendly customer support team anytime. We hope you enjoy the site!",


//    INFO TOOLTIP MESSAGES
    tTitle: "Select your Title",
    tFirstName: `Enter your First Name
                 (must be at least 2 characters)`,
    tMiddleName: "Enter your Middle Name",
    tLastName: `Enter your Last Name
                 (must be at least 2 characters)`,
    tBirthDate: "Select your Date of Birth. This is to verify your age.",
    tEmail: "Enter your valid Email Address",
    tNationality: "Select your Nationality",
    tAddress1: "Please enter your home address as it would appear on official personal documentation.",
    tCity: "Enter your town/city you live in",
    tPostCode: "Enter your postcode and click the search button",
    tMobNum: "Enter a valid Mobile Number",
    tUsername: `Pick a unique Username that will let you access your account.
                Must be 6-12 characters length.
                Special characters except period (.) is not allowed`,
    tPassword: "Input your Password with minimum of 6 characters",
    tPassConfirm: "Enter your Password again",
    tSecurityQ: "Please select a Security Question",
    tSecurityA: "Enter your Answer to the selected Security Question",
    tCurrency: "Select your Currency for your account",


//  OTHER TEXTS

    searchPostCode: "Search through Post Code",
    enterManually: "or Enter Address manually"

};

let getValue = (code) => root[code];

export default getValue;