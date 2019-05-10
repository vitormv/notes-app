import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NewNoteButton.scss';

const NewNoteButton = () => (
    <div className={styles.button}>
        <FontAwesomeIcon icon={['far', 'edit']} size="lg" />
    </div>
);

NewNoteButton.propTypes = {};

export { NewNoteButton };
