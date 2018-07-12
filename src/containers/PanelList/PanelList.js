import React from 'react';
import PropTypes from 'prop-types';
import { ListHeader } from 'src/components/list/ListHeader';
import { connect } from 'react-redux';
import { NotesList } from 'src/components/list/NotesList';
import { navigationSelectNoteAction } from 'src/store/actions';
import {
    currentNotesSelector,
    highlightedItemSelector,
    lastActiveNoteSelector,
} from 'src/store/selectors';

const PanelListPure = ({
    notes,
    onSelectNote,
    highlighted,
    lastActiveNote,
}) => (
    <section className="l-panel-list o-notes-list">
        <ListHeader />

        <NotesList
            notes={notes}
            onSelectNote={onSelectNote}
            highlighted={highlighted}
            lastActiveNote={lastActiveNote}
        />
    </section>
);

PanelListPure.propTypes = {
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

PanelListPure.defaultProps = {
    lastActiveNote: null,
};

const mapStateToProps = state => ({
    notes: currentNotesSelector(state),
    highlighted: highlightedItemSelector(state),
    lastActiveNote: lastActiveNoteSelector(state),
});

const mapDispatchToProps = dispatch => ({
    onSelectNote: noteUid => dispatch(navigationSelectNoteAction(noteUid)),
});

export const PanelList = connect(mapStateToProps, mapDispatchToProps)(PanelListPure);
