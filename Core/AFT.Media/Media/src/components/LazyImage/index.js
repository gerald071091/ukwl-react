import React from 'react';

import styles from './lazy-image.scss';

const EMPTYFUNC = () => {};

class LazyImage extends React.Component {
	static propTypes = {
		alt: React.PropTypes.string,
		className: React.PropTypes.string,
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		onClick: React.PropTypes.func,
		src: React.PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);

		this.imgClass = styles.imgHidden;
		this.refName = this._addHash('lazy-img');
		this._loadImage = this._loadImage.bind(this);
	}

	componentDidMount() {
		this._loadImage();
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.src !== this.props.src;
	}

	componentDidUpdate() {
		this._loadImage();
	}

	_addHash(text) {
		let hash = '',
			possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
			i = 0;

		for (i; i < 5; i++) {
			hash += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text + hash;
	}

	_loadImage() {
		let img = this.refs[this.refName];

		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = () => {
			img.className = `${styles.img} ${this.props.className || ''}`;
		};
	}

	render() {
		return <img
			src=""
			ref={this.refName}
			data-src={this.props.src}
			alt={this.props.alt || ''}
			name={this.props.name || ''}
			className={`${this.imgClass}`}
			id={this.props.id || ''}
			onClick={this.props.onClick || EMPTYFUNC}/>;
	}
}

export default LazyImage;