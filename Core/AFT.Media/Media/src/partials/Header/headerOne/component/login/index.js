/**
 * Created by bernard.molina on 5/3/2017.
 */
import React from 'react';
import {BtnGreen, LinkBtnRed} from 'comp/Button';
import Input from 'comp/Input';
import styles from './login.scss';


class Login extends React.Component {
	static propTypes = { data: React.PropTypes.func};

	constructor(props){
		super(props);

		this._submit = this._submit.bind(this);
	}

	_submit(e){
		e.preventDefault();

		let username = document.getElementById('username').value,
			password = document.getElementById('password').value;

		this.props.data(username, password);
	}

	render(){
		return (
			<form className={styles.login}>
				<p>Not a member yet?</p>
				<LinkBtnRed
					text="JOIN NOW"
					to={`register`} />
				<Input
					id="username"
					placeholder="Username"/>
				<Input
					id="password"
					type="password"
					placeholder="Password"/>
				<BtnGreen onClick={this._submit}>
					LOG IN
				</BtnGreen>
			</form>
		)
	}
}

export default Login;