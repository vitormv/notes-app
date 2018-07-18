import PropTypes from 'prop-types';
import React from 'react';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import { NoteSummary } from 'src/components/list/NoteSummary';
import { KeyboardNavigation } from 'src/containers/KeyboardNavigation';
import './NotesList.scss';

const cache = new CellMeasurerCache({
    defaultHeight: 90,
    fixedWidth: true,
});

const NotesList = ({
    notes, highlighted, lastActiveNote, onSelectNote,
}) => {
    const uids = Object.values(notes).map(note => note.uid);
    const numberOfRows = uids.length;
    const highlightedIndex = highlighted.column === 2 ?
        uids.indexOf(highlighted.itemUid) : undefined;

    return (
        <div className="o-notes-list__items">
            <KeyboardNavigation style={{ height: '100%' }}>
                <AutoSizer>
                    {({ height, width }) => (
                        <List
                            width={width}
                            height={height}
                            deferredMeasurementCache={cache}
                            style={{ outline: 'none' }}
                            scrollToIndex={highlightedIndex}
                            rowCount={numberOfRows}
                            rowHeight={cache.rowHeight}
                            rowRenderer={({
                                key, index, style, parent,
                            }) => (
                                <CellMeasurer
                                    cache={cache}
                                    columnIndex={0}
                                    key={key}
                                    parent={parent}
                                    rowIndex={index}
                                >
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
                                </CellMeasurer>
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
