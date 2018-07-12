import React from 'react';
import { SortBy } from 'src/components/list/SortBy';
import { SearchBox } from 'src/containers/SearchBox';
import styled from 'styled-components';

const ListHeaderStyled = styled.div`
    box-sizing: border-box;
    padding: 1rem 3.2rem;
    min-height: 6rem;
    max-height: 6rem;
    height: 6rem;
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
`;

const ListHeader = () => (
    <ListHeaderStyled>
        <SortBy />

        <SearchBox />

        <div className="o-list-header__new-note">
            <i className="far fa-lg fa-edit" />
        </div>
    </ListHeaderStyled>
);

export { ListHeader };
