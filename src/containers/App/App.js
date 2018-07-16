import React from 'react';
import PropTypes from 'prop-types';
import PanelGroup from 'react-panelgroup';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import classNames from 'classnames';
import { PanelFolders } from 'src/containers/PanelFolders';
import { PanelList } from 'src/containers/PanelList';
import { PanelEditor } from 'src/containers/PanelEditor';
import { isUiLoadingSelector } from 'src/store/selectors';
import { uiLoadedAction } from 'src/store/actions';
import { ThemeProvider } from 'styled-components';
import { styledTheme } from 'src/styles/styledTheme';
import './App.scss';

const AppPure = ({ isLoading }) => (
    <ThemeProvider theme={styledTheme}>
        <PanelGroup
            spacing={0}
            panelWidths={[
                { minSize: 150, size: 220, resize: 'dynamic' },
                { minSize: 350, size: 450, resize: 'dynamic' },
                { minSize: 500, resize: 'stretch' },
            ]}
        >
            <PanelFolders />
            <PanelList />
            <PanelEditor />
        </PanelGroup>
    </ThemeProvider>
);

AppPure.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onUiLoaded: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    isLoading: isUiLoadingSelector(state),
});

const mapDispatchToProps = {
    onUiLoaded: uiLoadedAction,
};

export const App = compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            this.props.onUiLoaded(true);
        },
    }),
)(AppPure);

