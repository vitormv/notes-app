import React from 'react';
import PropTypes from 'prop-types';
import { animated, Spring } from 'react-spring';
import { CSSTransition } from 'react-transition-group';
import { Icon } from 'src/components/ui/Icon';
import styled from 'styled-components';

const StyledFolderRename = styled.div`
    height: 2.8rem;
    position: relative;
    overflow: hidden;

    > * {
        position: absolute;
        top: 0;
        width: 100%;
    }
`;

const StyledRename = styled(animated.div)`
    padding: 0 3rem;
    box-sizing: border-box;
    position: relative;

    > span {
        position: absolute;
        top: 50%;
        right: 3rem;
        transform: translateY(-50%);
        font-size: 1.5rem;
        padding: 1rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity .15s ${props => props.theme.animation.fast};

        &:hover {
            color: ${props => props.theme.primary};
        }
    }

    > .close-input {
        &-enter {
            opacity: 0.01;
            &-active, &-done {
                opacity: 1;
            }
        }
    }
`;

const StyledInput = styled.input`
    background-color: ${props => props.theme.reversed.backgroundLight};
    border: none;
    color: ${props => props.theme.reversed.text};
    padding: 0.6rem 1rem 0.6rem 2rem;
    width: 100%;
    box-sizing: border-box;
    display: block;
    outline: none;
`;

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
            <StyledFolderRename>
                <Spring
                    native
                    to={{
                        opacity: isInputVisible ? '1' : '0',
                        transform: (isInputVisible || motion !== 'verticalSlide') ? 'translateY(0)' : 'translateY(-100%)',
                    }}
                    immediate={this.state.immediate}
                    render={styles => (
                        <StyledRename
                            key="folder-input"
                            style={{
                                ...styles,
                                paddingLeft: `${1 + ((indent + 1) * 2)}rem`,
                            }}
                        >
                            <StyledInput
                                innerRef={(el) => { this.inputNode = el; }}
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
                                <Icon name="times-circle" onClick={() => { this.toggleInput(false); }} />
                            </CSSTransition>
                        </StyledRename>
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
                    render={styles => (renderElement(styles, this.showInput))}
                />
            </StyledFolderRename>
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
