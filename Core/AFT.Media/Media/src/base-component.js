import React from 'react';
import Modal from 'comp/Modal';
import utils from 'helpers/utils';
import Loaders from 'comp/Loader';

const EMPTYFUNC = () => {};

let BaseComponent = (WrappedComponent) => class extends React.Component {
    constructor(props) {
        super(props);
        this._closeModal = this._closeModal.bind(this);
        this._openModal = this._openModal.bind(this);
		this._showLoader = this._showLoader.bind(this);
		this._hideLoader = this._hideLoader.bind(this);
    }

    state = {
        isModalActive: false,
		isLoaderActive: false,
		showLoader: false,
        modalMsg: <div />,
        closeCallback: EMPTYFUNC,
        okCallback: EMPTYFUNC,
        buttonText: '',
        title: '',
    };

    _closeModal(e, callback) {
        e && e.preventDefault();

        this.setState({
            isModalActive: false,
            modalMsg: '',
            closeCallback: EMPTYFUNC
        });

        (utils.isFunction(callback)) && callback();
    }

    _openModal(obj) {
        // utils.addClass(document.body, 'overflow-hidden');
        this.setState({
            buttonText: obj.buttonText || "OK",
			isConfirm: obj.isConfirm || false,
            isModalActive: true,
            isPlain: obj.isPlain || false,
            modalMsg: obj.msg,
            modalClassName: obj.modalClassName,
            modalStyle: obj.modalStyle,
            okCallback: obj.okCallback || this._closeModal,
            closeCallback: obj.closeCallback || this._closeModal,
            showLoader: obj.showLoader || false,
            title: obj.title,
        });
    }

	_showLoader(){
		this.setState({ isLoaderActive: true });
	}

	_hideLoader(){
		this.setState({ isLoaderActive: false });
	}

    render() {
        let modal = <Modal
                        open={this.state.isModalActive}
                        closeModal={this.state.closeCallback || this._closeModal}
                        click={this.state.okCallback || this._closeModal}
                        buttonText={this.state.buttonText}
                        isConfirm={this.state.isConfirm}
                        isPlain={this.state.isPlain}
                        title={this.state.title}
                        modalClassName={this.state.modalClassName}
                        modalStyle={this.state.modalStyle}
						showLoader={this.state.showLoader}>
                        {this.state.modalMsg}
                    </Modal>,
			loader = this.state.isLoaderActive ? <Loaders /> : '';

        return(
            <div>
                {modal}
				{loader}
                <WrappedComponent
                    setPageTitle={this._setPageTitle}
                    openModal={this._openModal}
                    closeModal={this._closeModal}
					closeLoader={this._hideLoader}
					showLoader={this._showLoader}
                    {...this.props} />
            </div>
        );
    }
};

export default BaseComponent;