import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { format } from 'date-fns';
import Highlighter from 'react-highlight-words';
import styles from './NoteSummary.scss';

const NoteSummaryPure = ({
    isActive, isHighlighted, uid, style, title, updatedAt, summary, onClick, searchWords,
}) => (
    <div
        className={classNames({
            [styles.noteSummary]: true,
            [styles.isActive]: isActive,
            [styles.isHighlighted]: isHighlighted,
        })}
        onClick={() => onClick(uid)}
        style={style}
    >
        <div className={styles.title}>
            <Highlighter
                searchWords={searchWords}
                autoEscape
                textToHighlight={title}
            />
        </div>
        <div className={styles.date} title={format(updatedAt, 'DD MMM')}>
            {format(updatedAt, 'DD MMM')}
        </div>
        <div className={styles.excerpt}>
            <Highlighter
                searchWords={searchWords}
                autoEscape
                textToHighlight={summary}
            />
        </div>
    </div>
);

NoteSummaryPure.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    isHighlighted: PropTypes.bool,
    style: PropTypes.shape({}),
    searchWords: PropTypes.arrayOf(PropTypes.string),
};

NoteSummaryPure.defaultProps = {
    isActive: false,
    isHighlighted: false,
    style: {},
    searchWords: [],
};

export const NoteSummary = NoteSummaryPure;
