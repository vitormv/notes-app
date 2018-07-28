import PropTypes from 'prop-types';
import React from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';

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

const RenameFolder = ({}) => (
    <StyledRename key="folder-input" style={styles}>
        <StyledInput
            innerRef={(el) => {
                this.inputNode = el;
            }}
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
            <Icon name="times-circle" onClick={() => {
                this.toggleInput(false);
            }}/>
        </CSSTransition>
    </StyledRename>
);

RenameFolder.propTypes = {
    title: PropTypes.string.isRequired,
};

export { RenameFolder };
