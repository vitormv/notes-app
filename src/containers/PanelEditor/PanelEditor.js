import React from 'react';
import { connect } from 'react-redux';
import { TextEditor } from 'src/components/TextEditor';
import { NoteType } from 'src/models/Note';
import { currentNoteSelector } from 'src/store/selectors';
import styles from './PanelEditor.scss';

const PanelEditorPure = ({ note }) => (
    <section className={styles.wrapper}>
        <div className={styles.editor}>
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
    note: currentNoteSelector(state),
});

export const PanelEditor = connect(mapStateToProps)(PanelEditorPure);
