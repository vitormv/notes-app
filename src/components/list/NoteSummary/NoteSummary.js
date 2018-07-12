import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import './NoteSummary.scss';

class NoteSummaryPure extends React.Component {
    shouldComponentUpdate(nextProps) {
        return !isEqual(this.props, nextProps);
    }

    getDOMNode() {
        return this.node;
    }

    render() {
        return (
            <div
                ref={(node) => { this.node = node; }}
                className={classNames({
                    'o-notes-list__note': true,
                    'o-note-summary': true,
                    'o-note-summary--active': this.props.isActive,
                    'o-note-summary--highlighted': this.props.isHighlighted,
                })}
                onClick={() => this.props.onClick(this.props.uid)}
                onFocus={() => this.props.onClick(this.props.uid)}
                role="link"
                tabIndex="0"
            >
                <div className="o-note-summary__title">{ this.props.title }</div>
                <div className="o-note-summary__date" title={format(this.props.updatedAt, 'DD MMM')}>
                    { format(this.props.updatedAt, 'DD MMM') }
                </div>
                <div className="o-note-summary__excerpt">
                    { this.props.summary }
                </div>
            </div>
        );
    }
}

NoteSummaryPure.propTypes = {
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    updatedAt: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool,
    isHighlighted: PropTypes.bool,
};

NoteSummaryPure.defaultProps = {
    isActive: false,
    isHighlighted: false,
};

export const NoteSummary = NoteSummaryPure;
