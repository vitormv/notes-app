import React from 'react';
import { NewNoteButton } from 'src/components/list/NewNoteButton';
import { SortBy } from 'src/components/list/SortBy';
import { SearchBox } from 'src/containers/SearchBox';
import styles from './ListHeader.scss';

const ListHeader = () => (
    <div className={styles.listHeader}>
        <SortBy />
        <SearchBox />
        <NewNoteButton />
    </div>
);

export { ListHeader };
