import React from 'react';
import styled from 'styled-components';

const SortByStyled = styled.div`
    font-size: 1.2rem;
    padding-right: 2rem;
`;

const SortByLabel = styled.div``;

const SortBySelection = styled.div`
    font-weight: bold;
`;

const SortBy = () => (
    <SortByStyled>
        <SortByLabel>Sort by:</SortByLabel>
        <SortBySelection>Date added</SortBySelection>
    </SortByStyled>
);

export { SortBy };
