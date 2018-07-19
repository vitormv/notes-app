import React from 'react';
import PropTypes from 'prop-types';
import { animated, Spring } from 'react-spring';
import { CSSTransition } from 'react-transition-group';
import { FolderItemLabel } from 'src/components/folders/FolderItemLabel';
import { Icon } from 'src/components/ui/Icon';
import styled from 'styled-components';

const StyledLi = styled.li`
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
    padding: 0 3rem 0 3rem;
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

class AddFolder extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isAddingFolder: false,
            folderNameInputValue: '',
            immediate: false,
        };

        this.showInput = this.showInput.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.handleInputKey = this.handleInputKey.bind(this);
    }

    componentDidUpdate() {
        if (this.state.isAddingFolder && this.inputNode) {
            this.inputNode.focus();
        }
    }

    onInputChange(event) {
        this.setState({ folderNameInputValue: event.target.value });
    }

    onBlur() {
        if (this.inputNode && this.inputNode.value.length === 0) {
            this.toggleInput(false);
        }
    }

    showInput() {
        this.toggleInput(true);
    }

    toggleInput(isVisible, immediate = false) {
        this.setState({
            isAddingFolder: isVisible,
            folderNameInputValue: isVisible ? this.state.folderNameInputValue : '',
            immediate,
        });
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
                    this.props.addFolderCallback(value);
                }
                break;
            }
            default:
            // noop
        }
    }

    render() {
        const { hasAddButton, indent } = this.props;
        const isAdding = this.state.isAddingFolder;

        return (
            <StyledLi>
                <Spring
                    native
                    to={{
                        transform: isAdding ? 'translateY(0)' : 'translateY(-100%)',
                        opacity: isAdding ? '1' : '0',
                    }}
                    immediate={this.state.immediate}
                >
                    {styles => (
                        <StyledRename key="folder-input" style={styles}>
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
                </Spring>

                {hasAddButton && (
                    <Spring
                        native
                        to={{
                            transform: isAdding ? 'translateY(110%)' : 'translateY(10%)',
                            opacity: isAdding ? '0' : '1',
                        }}
                    >
                        {styles => (
                            <FolderItemLabel
                                style={styles}
                                label="add folder"
                                icon="plus"
                                indent={indent}
                                onClick={this.showInput}
                                isSmall
                            />
                        )}
                    </Spring>
                )}
            </StyledLi>
        );
    }
}

AddFolder.propTypes = {
    addFolderCallback: PropTypes.func,
    hasAddButton: PropTypes.bool,
    indent: PropTypes.number,
};

AddFolder.defaultProps = {
    addFolderCallback: () => {},
    hasAddButton: false,
    indent: 0,
};

export { AddFolder };
