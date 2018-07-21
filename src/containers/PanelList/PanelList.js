import React from 'react';
import PropTypes from 'prop-types';
import { HighlightedItemType } from 'src/models/HighlightedItem';
import { NoteCollectionType } from 'src/models/Note';
import styled from 'styled-components';
import { ListHeader } from 'src/components/list/ListHeader';
import { connect } from 'react-redux';
import { NotesList } from 'src/components/list/NotesList';
import { Show } from 'src/components/ui/Show';
import { KeyboardNavigation } from 'src/containers/KeyboardNavigation';
import { navigationSelectNoteAction } from 'src/store/actions';
import {
    currentNotesSelector, getCurrentNoteUidsHashSelector,
    highlightedItemSelector,
    lastActiveNoteSelector,
} from 'src/store/selectors';

const StyledPanelList = styled.section`
    background-color: ${props => props.theme.gray.light};
    border-right: 1px solid ${props => props.theme.gray.medium};
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    font-size: 1.6rem;

    > :nth-child(1) {
      flex: 0 0 6rem;
    }
    
    > :nth-child(2) {
      flex: 1;
    }
`;

const PanelListPure = ({
    notes,
    onSelectNote,
    highlighted,
    lastActiveNote,
    listHash,
}) => (
    <StyledPanelList>
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
                    highlighted={highlighted}
                    lastActiveNote={lastActiveNote}
                    listHash={listHash}
                />
            </Show>
        </KeyboardNavigation>
    </StyledPanelList>
);

PanelListPure.propTypes = {
    notes: NoteCollectionType.isRequired,
    onSelectNote: PropTypes.func.isRequired,
    highlighted: HighlightedItemType.isRequired,
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
