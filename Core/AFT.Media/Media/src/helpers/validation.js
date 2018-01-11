/**
 * Created by gian.jamisola on 5/9/2017.
 */

class Validation {

    isAlpha(Value) {
        let value = Value;
        return (/^[a-zA-Z]+$/.test(value));
    }

    isNumeric(Value) {
        let value = Value;
        return ((/^[0-9]+$/).test(value));
    }

    isChineseOnly(Value) {
        let value = Value;
        const R = /^[\u4E00-\u9FFF\u3400-\u4DFF]+$/;

        return (R.test(value) && !this.hasSpecialChars(value) && !this.hasAlpha(value) && !this.hasNumber(value));
    }

    isAlphaNumeric(Value, Spacing) {
        let value = Value;
        let spacing = typeof Spacing !== 'undefined' ? Spacing : false;

        return (spacing) ? (/^[a-zA-Z0-9\s]*$/.test(value)) : (/^[a-zA-Z0-9]*$/.test(value));
    }

    isFirstCharAlpha(Value) {
        const firstChar = 0;
        let value = Value;
        return (/^[a-zA-Z]*$/.test(value.charAt(firstChar)));
    }

    isLengthSmaller(Value, Min) {
        const minLength = 6;
        let value = Value,
            min = typeof Min !== 'undefined' ? Min : minLength;
        return (min > value.length);
    }

    isLengthBigger(Value, Max) {
        const maxLength = 12;
        let value = Value,
            max = typeof Max !== 'undefined' ? Max : maxLength;
        return (max < value.length);
    }

    isLengthRangeValid(Value, Min, Max) {
        const minLength = 6,
            maxLength = 20;
        let value = String(Value),
            min = typeof Min !== 'undefined' ? Min : minLength,
            max = typeof Max !== 'undefined' ? Max : maxLength;
        return !(this.isLengthSmaller(value, min) || this.isLengthBigger(value, max));
    }

    isDecimal(Value) {
        let value = Value;
        return ((/^\d+(\.\d{1,2})?$/).test(value));
    }

    isCurrencyValid(Value) {
        let value = Value;
        return (/^(\d*\.\d{1,}|\d+)$/).test(value);
    }

    isValueRangeValid(Value, Min, Max) {
        const MAX = 1000000; //dummy data
        let value = Value,
            min = Min,
            max = typeof Max !== 'undefined' ? Max : MAX;
        return (value >= min) || (value >= min && value <= max);
    }

    hasAlpha(Value) {
        let value = Value;
        return (/^(?=.*[a-zA-Z])/.test(value));
    }

    hasAlphaNum(Value) {
        let value = Value;
        return (/^(?=.*[0-9])(?=.*[a-z|A-Z])/.test(value));
    }

    hasAlphaNumSpecialChars(Value) {
        let value = Value;
        return (/^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])/.test(value) &&
        this.hasSpecialChars(value));
    }

    hasNumber(Value) {
        let value = Value;
        return /\d/.test(value);
    }

    hasSpecialChars(Value) {
        let value = Value;
        return /[!@#$%^&*()_+{}:;"/<>,.?"[\]\\|~`=]/.test(value);
    }

    isStringMultiLingValid(Value) {
        let value = Value;
        return /[\u0000-~\u00a0\u0e00-\u0e7e\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\u3040-ゞ゠-ヾ㐀-\u4dbe一-\u9ffe\uaa80-\uaade]|[\ud840-\ud868\ud86a-\ud86c][\udc00-\udfff]|\ud869[\udc00-\udede\udf00-\udfff]|\ud86d[\udc00-\udf3e\udf40-\udfff]|\ud86e[\udc00-\udc1e]/.test(value);
    }

    /* Form Validations */
    isInputEmpty(Value) {
        let value = Value;
        return value === '' || value === null || typeof value === 'undefined';
    }

    isAddressValid(Value) {
        const minLength = 1,
            maxLength = 50;
        let value = Value;
        return (!(/[!@#$%^&*()+{}:;"/<>,?"[\]\\|~`=]/.test(value)) && this.isStringMultiLingValid(value) && !this.isInputEmpty(value) && this.isLengthRangeValid(value,minLength, maxLength));
    }

    isCityValid(Value) {
        let value = Value;
        return (!(/^[0-9]/.test(value)) && this.isStringMultiLingValid(value) && !this.isInputEmpty(value));
    }

    isZipCodeValid(Value) {
        const minLength = 1,
            maxLength = 10;
        let value = Value;
        return (this.isLengthRangeValid(value, minLength, maxLength) && (/^[a-zA-Z0-9-]*$/).test(value));
    }

    isNameValid(Value) {
        const minLength = 1,
            maxLength = 50;
        let value = Value;
        return (this.isStringMultiLingValid(value) && !this.hasNumber(value) && !this.hasSpecialChars(value) && this.isLengthRangeValid(value, minLength, maxLength));
    }

    isUsernameValid(Value) {
        const minLength = 6,
            maxLength = 12;
        let value = Value;
        // return !(!(/^[a-zA-Z0-9_]*$/.test(value)) || !this.isLengthRangeValid(value, 6, 12) || this.isNumeric(value));
        return (/^[A-Za-z0-9.]+$/.test(value) && this.isLengthRangeValid(value, minLength, maxLength) && this.isFirstCharAlpha(value));
    }

    isLoginUsernameValid(Value) {
        const minLength = 6,
            maxLength = 20;
        let value = Value;
        return !(!(/^[a-zA-Z0-9_.]*$/.test(value)) || !this.isLengthRangeValid(value, minLength, maxLength));
    }

    isPasswordValid(Value) {
        const minLength = 6,
            maxLength = 20;
        let value = Value;
        return (this.isLengthRangeValid(value, minLength, maxLength) && !/[\s]/.test(value));
    }

    isMobileValid(Value) {
        const minLength = 8,
            maxLength = 20;
        let value = Value;
        return (this.isLengthRangeValid(value, minLength, maxLength) && this.isNumeric(value));
    }

    isEmailValid(Value) {
        const minLength = 1,
            maxLength = 50;
        let value = Value;
        // Based on General Email Regex (RFC 5322 Official Standard)
        // Javascript version - Source : http://emailregex.com/
        return (/^[-a-z0-9~!$%^&*_=+}{'?]+(\.[-a-z0-9~!$%^&*_=+}{'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i.test(value) && this.isLengthRangeValid(value, minLength, maxLength));
    }

    isLeapYear(Year) {
        const num1 = 4,
            num2 = 0,
            num3 = 100,
            num4 = 400;
        let year = Year;
        return ((year % num1 === num2) && (year % num3 !== num2)) || (year % num4 === num2 && year !== num2);
    }

    isValidDate(Day, Month, Year) {
        const mJan = 1,
            mFeb = 2,
            mMar = 3,
            mMay = 5,
            mJul = 7,
            mAug = 8,
            mOct = 10,
            mDec = 12,
            dayVal = 1,
            dFormat1 = 30,
            dFormat2 = 31,
            dFebFormat1 = 28,
            dFebFormat2 = 29;

        let maxD = dFormat1,
        month = parseInt(Month),
        day = parseInt(Day),
        year = parseInt(Year);

        switch (month) {
            case mJan:
            case mMar:
            case mMay:
            case mJul:
            case mAug:
            case mOct:
            case mDec:
                maxD = dFormat2;
                break;

            case mFeb:
                maxD = (this.isLeapYear(year)) ? dFebFormat2 : dFebFormat1;
                break;

            default:
                maxD = dFormat1;
                break;
        }

        return (day >= dayVal && day <= maxD);
    }

    isTelephoneValid(Telephone) {
        let telephone = Telephone;
        return (/^(00|\\+)?\\d{8,15}$/.test(telephone));
    }
}

export default new Validation();