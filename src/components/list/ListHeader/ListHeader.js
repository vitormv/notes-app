import React from 'react';
import { NewNoteButton } from 'src/components/list/NewNoteButton';
import { SortBy } from 'src/components/list/SortBy';
import { SearchBox } from 'src/containers/SearchBox';
import styled from 'styled-components';

const ListHeaderStyled = styled.div`
    box-sizing: border-box;
    padding: 1rem 3.2rem;
    flex: 0 0 6rem;
    border-bottom: 1px solid ${props => props.theme.gray.medium};
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-app-region: drag;
    
    > :nth-child(1) {
        flex: 1 0 auto;
    }
    > :nth-child(2) {
        flex: 2 1 auto;   
    }
    > :nth-child(3) {
        text-align: right;   
    }
    
    > * {
        // disable drag on Electron on all children
        -webkit-app-region: no-drag;
    }
`;

const ListHeader = () => (
    <ListHeaderStyled>
        <SortBy />
        <SearchBox />
        <NewNoteButton />
    </ListHeaderStyled>
);

export { ListHeader };
