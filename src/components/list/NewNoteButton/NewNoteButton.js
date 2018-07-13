import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NewNoteButtonStyled = styled.div`
  padding-left: 2rem;
  text-align: right;
  cursor: pointer;
  
  &:hover {
    color: ${props => props.theme.primary}
  }
`;

const NewNoteButton = () => (
    <NewNoteButtonStyled>
        <i className="far fa-lg fa-edit" />
    </NewNoteButtonStyled>
);

NewNoteButton.propTypes = {};

export { NewNoteButton };
