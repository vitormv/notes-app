import React from 'react';
import PropTypes from 'prop-types';
import { animated, Spring } from 'react-spring';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RenameFolder.scss';

class RenameFolder extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            folderNameInputValue: this.props.defaultInputValue,
            immediate: false,
        };

        this.showInput = this.showInput.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleInputKey = this.handleInputKey.bind(this);
    }

    componentDidUpdate() {
        if (this.props.isInputVisible && this.inputNode) {
            this.inputNode.focus();
        }
    }

    onInputChange(event) {
        this.setState({ folderNameInputValue: event.target.value });
    }

    onBlur() {
        this.toggleInput(false);
    }

    showInput() {
        this.toggleInput(true);
    }

    toggleInput(isInputVisible, immediate = false) {
        this.setState({
            folderNameInputValue: this.props.defaultInputValue,
            immediate,
        });

        this.props.toggleInput(isInputVisible);
    }

    handleInputKey(event) {
        if (!this.inputNode) return;

        switch (event.key) {
            case 'Escape':
                this.toggleInput(false);
                break;
            case 'Enter': {
                const { value } = this.inputNode;

                if (value.length > 0) {
                    this.inputNode.blur();
                    this.toggleInput(false, true);
                    this.props.onEnter(value);
                }
                break;
            }
            default:
                event.stopPropagation();
        }
    }

    render() {
        const {
            isInputVisible,
            renderElement,
            indent,
            motion,
        } = this.props;

        return (
            <div className={styles.container}>
                <Spring
                    native
                    to={{
                        opacity: isInputVisible ? '1' : '0',
                        transform: (isInputVisible || motion !== 'verticalSlide') ? 'translateY(0)' : 'translateY(-100%)',
                    }}
                    immediate={this.state.immediate}
                    render={dynamicStyles => (
                        <animated.div
                            className={styles.inputWrapper}
                            key="folder-input"
                            style={{
                                ...dynamicStyles,
                                paddingLeft: `${1 + ((indent + 1) * 2)}rem`,
                            }}
                        >
                            <input
                                className={styles.input}
                                ref={(el) => { this.inputNode = el; }}
                                type="text"
                                placeholder="folder name"
                                onBlur={this.onBlur}
                                onKeyDown={this.handleInputKey}
                                onChange={this.onInputChange}
                                value={this.state.folderNameInputValue}
                            />
                            <CSSTransition
                                unmountOnExit
                                classNames="close-input"
                                in={this.state.folderNameInputValue.length > 0}
                                timeout={150}
                            >
                                <FontAwesomeIcon
                                    icon="times-circle"
                                    onClick={() => { this.toggleInput(false); }}
                                />
                            </CSSTransition>
                        </animated.div>
                    )}
                />

                <Spring
                    native
                    to={{
                        opacity: isInputVisible ? '0' : '1',
                        transform: (motion !== 'verticalSlide')
                            ? 'none'
                            : (isInputVisible) ? 'translateY(110%)' : 'translateY(10%)',
                    }}
                    render={dynamicStyles => (renderElement(dynamicStyles, this.showInput))}
                />
            </div>
        );
    }
}

RenameFolder.propTypes = {
    isInputVisible: PropTypes.bool.isRequired,
    toggleInput: PropTypes.func.isRequired,
    renderElement: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired,
    indent: PropTypes.number,
    defaultInputValue: PropTypes.string,
    motion: PropTypes.oneOf(['verticalSlide', 'fade']),
};

RenameFolder.defaultProps = {
    defaultInputValue: '',
    indent: 0,
    motion: 'fade',
};

export { RenameFolder };
