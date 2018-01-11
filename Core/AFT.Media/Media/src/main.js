//import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes';

//all third party css should be included here
import '../Content/vendor/reset.min.css';
import '../Content/vendor/bootstrap/css/bootstrap.min.css';
import '../Content/vendor/fontawesome/css/font-awesome.min.css';
import '../Content/vendor/slick/slick.css';
import '../Content/vendor/slick/slick-theme.css';
import '../Content/vendor/loaders/loaders.min.css';
import '../Content/vendor/rc-tooltip/bootstrap.css';
import '../Content/vendor/itl-tel-input/css/intlTelInput.css';
import 'react-datepicker/dist/react-datepicker.css';
import './master.scss';

ReactDOM.render(routes, document.getElementById('app'));
