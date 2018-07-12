import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import classNames from 'classnames';
import { PanelFolders } from 'src/containers/PanelFolders';
import { PanelList } from 'src/containers/PanelList';
import { PanelEditor } from 'src/containers/PanelEditor';
import { isUiLoadingSelector } from 'src/store/selectors';
import { uiLoaded } from 'src/store/actions';
import { ThemeProvider } from 'styled-components';
import { styledTheme } from 'src/styles/styledTheme';
import './App.scss';


const AppPure = ({ isLoading }) => (
    <ThemeProvider theme={styledTheme}>
        <div
            className={classNames({
                'l-main': true,
                'l-main--loading': isLoading,
            })}
        >
            <PanelFolders />
            <PanelList />
            <PanelEditor />
        </div>
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
    onUiLoaded: uiLoaded,
};

export const App = compose(
    connect(mapStateToProps, mapDispatchToProps),
    lifecycle({
        componentDidMount() {
            this.props.onUiLoaded(true);
        },
    }),
)(AppPure);

