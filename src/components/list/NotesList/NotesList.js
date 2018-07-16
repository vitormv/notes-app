import PropTypes from 'prop-types';
import React from 'react';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import { NoteSummary } from 'src/components/list/NoteSummary';
import { KeyboardNavigation } from 'src/containers/KeyboardNavigation';
import './NotesList.scss';

const NotesList = ({
    notes, highlighted, lastActiveNote, onSelectNote,
}) => {
    const uids = Object.values(notes).map(note => note.uid);
    const numberOfRows = uids.length;
    const highlightedIndex = highlighted.column === 2 ? uids.indexOf(highlighted.itemUid) : undefined;

    return (
        <div className="o-notes-list__items">
            <KeyboardNavigation style={{ height: '100%' }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={numberOfRows}
                            scrollToIndex={highlightedIndex}
                            rowHeight={133}
                            style={{ outline: 'none' }}
                            rowRenderer={({ key, index, style }) => (
                                <NoteSummary
                                    key={key}
                                    style={style}
                                    uid={notes[index].uid}
                                    title={notes[index].title}
                                    summary={notes[index].summary.substr(0, 100)}
                                    updatedAt={notes[index].updatedAt}
                                    onClick={onSelectNote}
                                    isActive={lastActiveNote === notes[index].uid}
                                    isHighlighted={(
                                        highlighted.column === 2
                                        && highlighted.itemUid === notes[index].uid
                                    )}
                                />
                            )}
                        />

                    )}
                </AutoSizer>
            </KeyboardNavigation>
        </div>
    );
};

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
