import React from 'react';
import { TextEditor } from 'src/components/TextEditor';
import './PanelEditor.scss';

export const PanelEditor = () => (
    <section className="l-panel-editor">
        <div className="o-editor">
            <TextEditor />
        </div>
        <div className="editor-sidebar">

        </div>
    </section>
);

