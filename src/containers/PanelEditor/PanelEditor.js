import React from 'react';
import { connect } from 'react-redux';
import { TextEditor } from 'src/components/TextEditor';
import { NoteType } from 'src/models/Note';
import { highlightedNoteSelector } from 'src/store/selectors';
import './PanelEditor.scss';

const PanelEditorPure = ({ note }) => (
    <section className="l-panel-editor">
        <div className="o-editor">
            {((note && 'summary' in note)) && (
                <TextEditor key={note.uid} noteContent={[note.title, note.summary].join('\n')} />
            )}
        </div>
        <div className="editor-sidebar" />
    </section>
);

PanelEditorPure.propTypes = {
    note: NoteType,
};

PanelEditorPure.defaultProps = {
    note: null,
};

const mapStateToProps = state => ({
    note: highlightedNoteSelector(state),
});

export const PanelEditor = connect(mapStateToProps)(PanelEditorPure);
