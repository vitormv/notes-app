import React from 'react';
import PropTypes from 'prop-types';
import { ListHeader } from 'src/components/list/ListHeader';
import { connect } from 'react-redux';
import { NotesList } from 'src/components/list/NotesList';
import { Show } from 'src/components/ui/Show';
import { navigationSelectNoteAction } from 'src/store/actions';
import {
    currentNotesSelector, getCurrentNoteUidsHashSelector,
    highlightedItemSelector,
    lastActiveNoteSelector,
} from 'src/store/selectors';

const PanelListPure = ({
    notes,
    onSelectNote,
    highlighted,
    lastActiveNote,
    listHash,
}) => (
    <section className="l-panel-list o-notes-list">
        <ListHeader />

        <Show when={notes.length < 1}>
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                Ohh damm, 0 notes in here <span role="img" aria-label="sad face">😢</span>.
            </div>
        </Show>

        <Show when={notes.length > 0}>
            <NotesList
                notes={notes}
                onSelectNote={onSelectNote}
                highlighted={highlighted}
                lastActiveNote={lastActiveNote}
                listHash={listHash}
            />
        </Show>
    </section>
);

PanelListPure.propTypes = {
    notes: PropTypes.arrayOf(PropTypes.shape({
        uid: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        updatedAt: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
    })).isRequired,
    onSelectNote: PropTypes.func.isRequired,
    highlighted: PropTypes.shape({
        column: PropTypes.number.isRequired,
        itemUid: PropTypes.string,
    }).isRequired,
    lastActiveNote: PropTypes.string,
    listHash: PropTypes.string,
};

PanelListPure.defaultProps = {
    lastActiveNote: null,
    listHash: '',
};

const mapStateToProps = state => ({
    notes: currentNotesSelector(state),
    highlighted: highlightedItemSelector(state),
    lastActiveNote: lastActiveNoteSelector(state),
    listHash: getCurrentNoteUidsHashSelector(state),
});

const mapDispatchToProps = dispatch => ({
    onSelectNote: noteUid => dispatch(navigationSelectNoteAction(noteUid)),
});

export const PanelList = connect(mapStateToProps, mapDispatchToProps)(PanelListPure);
