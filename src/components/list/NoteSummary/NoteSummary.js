import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { format } from 'date-fns';
import Highlighter from 'react-highlight-words';
import './NoteSummary.scss';

const NoteSummaryPure = ({
    isActive, isHighlighted, uid, style, title, updatedAt, summary, onClick, searchWords,
}) => (
    <div
        className={classNames({
            'o-notes-list__note': true,
            'o-note-summary': true,
            'o-note-summary--active': isActive,
            'o-note-summary--highlighted': isHighlighted,
        })}
        onClick={() => onClick(uid)}
        style={style}
    >
        <div className="o-note-summary__title">
            <Highlighter
                searchWords={searchWords}
                autoEscape
                textToHighlight={title}
            />
        </div>
        <div className="o-note-summary__date" title={format(updatedAt, 'DD MMM')}>
            {format(updatedAt, 'DD MMM')}
        </div>
        <div className="o-note-summary__excerpt">
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
