import React from 'react';
import PropTypes from 'prop-types';
import { NoteCollectionType } from 'src/models/Note';
import { ListHeader } from 'src/components/list/ListHeader';
import { connect } from 'react-redux';
import { NotesList } from 'src/components/list/NotesList';
import { Show } from 'src/components/ui/Show';
import { KeyboardNavigation } from 'src/containers/KeyboardNavigation';
import { navigationSelectNoteAction } from 'src/store/actions';
import {
    currentNotesSelector, getCurrentNoteUidsHashSelector,
    unhighlightedNoteSelector, highlightedNoteUid, getSearchQueryWordsSelector,
} from 'src/store/selectors';
import styles from './PanelList.scss';

const PanelListPure = ({
    notes,
    onSelectNote,
    highlightedUid,
    lastActiveNote,
    listHash,
    searchWords,
}) => (
    <section className={styles.panelList}>
        <ListHeader />

        <KeyboardNavigation columnIndex={2}>
            <Show when={notes.length < 1}>
                <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    Ohh damm, 0 notes in here <span role="img" aria-label="sad face">😢</span>.
                </div>
            </Show>

            <Show when={notes.length > 0}>
                <NotesList
                    notes={notes}
                    onSelectNote={onSelectNote}
                    highlightedUid={highlightedUid}
                    lastActiveNote={lastActiveNote}
                    listHash={listHash}
                    searchWords={searchWords}
                />
            </Show>
        </KeyboardNavigation>
    </section>
);

PanelListPure.propTypes = {
    notes: NoteCollectionType.isRequired,
    onSelectNote: PropTypes.func.isRequired,
    highlightedUid: PropTypes.string,
    lastActiveNote: PropTypes.string,
    listHash: PropTypes.string,
    searchWords: PropTypes.arrayOf(PropTypes.string),
};

PanelListPure.defaultProps = {
    lastActiveNote: null,
    listHash: '',
    highlightedUid: null,
    searchWords: [],
};

const mapStateToProps = state => ({
    notes: currentNotesSelector(state),
    highlightedUid: highlightedNoteUid(state),
    lastActiveNote: unhighlightedNoteSelector(state),
    listHash: getCurrentNoteUidsHashSelector(state),
    searchWords: getSearchQueryWordsSelector(state),
});

const mapDispatchToProps = dispatch => ({
    onSelectNote: noteUid => dispatch(navigationSelectNoteAction(noteUid)),
});

export const PanelList = connect(mapStateToProps, mapDispatchToProps)(PanelListPure);
