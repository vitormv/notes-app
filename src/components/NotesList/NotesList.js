import React from 'react';
import PropTypes from 'prop-types';
import { NoteSummary } from 'src/components/NoteSummary';
import { KeyboardNavigation } from 'src/containers/KeyboardNavigation';
import { ensureElementIsInView } from 'src/functions/dom/ensureElementisInView';
import './NotesList.scss';

class NotesList extends React.Component {
    componentDidUpdate() {
        if (this.highlightedEl && this.container) {
            ensureElementIsInView(this.container, this.highlightedEl.getDOMNode());
        }
    }

    render() {
        const {
            notes,
            highlighted,
            lastActiveNote,
            onSelectNote,
        } = this.props;
        this.highlightedEl = null;

        return (
            <div className="o-notes-list__items" ref={(el) => { this.container = el; }}>
                <KeyboardNavigation>
                    {
                        Object.keys(notes).map((index) => {
                            const isHighlighted = highlighted.column === 2
                                && highlighted.itemUid === notes[index].uid;

                            return (
                                <NoteSummary
                                    ref={(node) => {
                                        if (isHighlighted) this.highlightedEl = node;
                                    }}
                                    key={notes[index].uid}
                                    uid={notes[index].uid}
                                    title={notes[index].title}
                                    summary={notes[index].summary}
                                    updatedAt={notes[index].updatedAt}
                                    onClick={onSelectNote}
                                    isActive={lastActiveNote === notes[index].uid}
                                    isHighlighted={isHighlighted}
                                />
                            );
                        })
                    }
                </KeyboardNavigation>
            </div>
        );
    }
}

NotesList.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        uid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        updatedAt: PropTypes.number.isRequired,
        summary: PropTypes.string.isRequired,
    })).isRequired,
    onSelectNote: PropTypes.func.isRequired,
    highlighted: PropTypes.shape({
        column: PropTypes.number.isRequired,
        itemUid: PropTypes.string,
    }).isRequired,
    lastActiveNote: PropTypes.string,
};

NotesList.defaultProps = {
    lastActiveNote: null,
};

export { NotesList };
