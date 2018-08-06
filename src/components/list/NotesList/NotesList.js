import PropTypes from 'prop-types';
import React from 'react';
import memoizeOne from 'memoize-one';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import { NoteSummary } from 'src/components/list/NoteSummary';
import { NoteCollectionType } from 'src/models/Note';
import './NotesList.scss';

// list hash parameter is used only to bust the cache
const getNewCache = listHash => new CellMeasurerCache({
    defaultHeight: 90,
    fixedWidth: true,
});

const getRowSizesCache = memoizeOne(getNewCache);

class NotesList extends React.PureComponent {
    render() {
        const {
            notes, highlightedUid, lastActiveNote, onSelectNote, listHash, searchWords,
        } = this.props;
        const uids = notes.map(note => note.uid);
        const numberOfRows = uids.length;
        const highlightedIndex = highlightedUid ? uids.indexOf(highlightedUid) : undefined;

        const cache = getRowSizesCache(listHash);

        return (
            <div className="o-notes-list__items">
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
                                        isHighlighted={highlightedUid === notes[index].uid}
                                        searchWords={searchWords}
                                    />
                                </CellMeasurer>
                            )}
                        />

                    )}
                </AutoSizer>
            </div>
        );
    }
}

NotesList.propTypes = {
    notes: NoteCollectionType.isRequired,
    onSelectNote: PropTypes.func.isRequired,
    highlightedUid: PropTypes.string,
    lastActiveNote: PropTypes.string,
    listHash: PropTypes.string,
    searchWords: PropTypes.arrayOf(PropTypes.string),
};

NotesList.defaultProps = {
    lastActiveNote: null,
    listHash: '',
    highlightedUid: '',
    searchWords: [],
};

export { NotesList };
