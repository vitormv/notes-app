import React from 'react';
import styles from './SortBy.scss';

const SortBy = () => (
    <div className={styles.container}>
        <div className={styles.label}>Sort by:</div>
        <div className={styles.select}>Date added</div>
    </div>
);

export { SortBy };
