import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { NotesList } from 'src/components/NotesList';
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
        <div className="o-notes-list__header o-list-header">
            <div className="o-list-header__sort">
                Sort by
            </div>
            <div className="o-list-header__search">
                <i className="fas fa-search o-list-header__search-icon" />
                <input className="o-list-header__search-input" name="search" placeholder="Search" title="search" type="search" />
            </div>
            <div className="o-list-header__new-note">
                <i className="far fa-lg fa-edit" />
            </div>
        </div>

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
