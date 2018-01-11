/**
 * Created by gian.jamisola on 5/5/2017.
 */
import React from 'react';
import styles from '../Desktop/navigation.scss';
import Slider from 'comp/Slider';

class Navigation extends React.Component {

	static propTypes = {
		navigation: React.PropTypes.array,
		selectedCategory: React.PropTypes.func,
	};

	constructor(props) {
		super(props);
		this._setActive = this._setActive.bind(this);
	}

	state = {
		target: '',
		navigationDisplay: [],
		isDefault: false
	};

	componentDidMount() {
		this.setState({
			isDefault: true,
			target: this.state.isDefault ? this.state.navListDisplay[0] : this.state.target
		})
	}

	componentWillReceiveProps(nextProps) {
		let navListOrder = nextProps.navigation.sort((a, b) => a.categoryOrderNumber - b.categoryOrderNumber),
			navListDisplay = [...new Set(navListOrder.map(item => item.categoryName))];

		this.setState({
			navigationDisplay: navListDisplay,
		});

		return (
			nextProps.navigation !== this.props.navigation ||
			nextProps.selectedCategory !== this.props.selectedCategory
		)
	}

	_setActive(e) {
		this.setState({
			target: e.target.value,
			isDefault: false
		});

		this.props.selectedCategory(e.target.value);
	}

	render() {
		let navList = this.state.navigationDisplay.map((item, i) => {

			let isFirstCategory = this.state.isDefault && item === this.state.navigationDisplay[0];

			return (
				<li className={ this.state.target === item || isFirstCategory ? styles.active : 'default'} key={i}>
					<button onClick={this._setActive} value={item}>{item}</button>
				</li>
			)
		});

		let navListItems = this.state.navigationDisplay.length,
			navListItemsDisplay = navListItems > 6 ? 6 : navListItems;

		return (
			<div className={styles.navHolder}>
				<Slider navList={navList}
				        slickClass={`navListCategory`}
				        noItemsToShow={navListItemsDisplay}
				        showArrows={navListItems > 6 && true}
				/>
			</div>
		)
	}
}

export default Navigation;
