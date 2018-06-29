import React from 'react';
import { PanelFolders } from 'src/containers/PanelFolders';
import { PanelList } from 'src/containers/PanelList';
import { PanelEditor } from 'src/containers/PanelEditor';
import './App.scss';

const App = () => (
    <div className="l-main">
        <PanelFolders />
        <PanelList />
        <PanelEditor />
    </div>
);

export { App };
