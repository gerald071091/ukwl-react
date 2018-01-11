/**
 * Created by gian.jamisola on 5/11/2017.
 */

import React from 'react';
import validation from 'helpers/validation';
import iCommon from 'nls/common';

import styles from './pw-strength.scss';

const getStrength = (pw) => {
    if (!validation.isPasswordValid(pw)) {
        return 0;
    }

    if (validation.hasAlphaNumSpecialChars(pw)) {
        return 3;
    }
    else if (validation.hasAlphaNum(pw)){
        return 2;
    }

    return 1;
};

let PasswordStrength = (props) => {
    let color = styles.strength0,
        strength = getStrength(props.password),
        text = '',
        width = 0;

    switch(strength) {
        case 0:
            color = styles.strength0;
            text = iCommon('psVeryWeak');
            width = 5;
            break;

        case 1:
            color = styles.strength1;
            text = iCommon('psWeak');
            width = 30;
            break;

        case 2:
            color = styles.strength2;
            text = iCommon('psStrong');
            width = 65;
            break;

        case 3:
            color = styles.strength3;
            text = iCommon('psVeryStrong');
            width = 100;
            break;
    }

    return(
        <div className={`progress ${props.className || ''}`}>
            <div
                className={`progress-bar ${color || ''}`}
                role="progressbar"
                aria-valuenow={width}
                aria-valuemin={0}
                aria-valuemax={100}
                style={{width: `${width}%`}} >
                <span className={styles.text}>{text}</span>
            </div>
        </div>
    );
};

PasswordStrength.propTypes = {
    password: React.PropTypes.string,
    className: React.PropTypes.string
}
export default PasswordStrength;