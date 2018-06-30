import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArrowKeyAsString } from 'src/functions/navigation';
import { handleArrowKeysPress } from 'src/store/actions';
import {
    currentNotesUidsSelector,
    flattenedFolderNodesSelector,
    highlightedItemSelector,
} from 'src/store/selectors';

const KeyboardNavigationPure = ({ handleArrowKeyPress, style, children }) => (
    <div
        onKeyDown={(event) => { handleArrowKeyPress(event); }}
        role="presentation"
        style={style}
    >
        {children}
    </div>
);

KeyboardNavigationPure.propTypes = {
    handleArrowKeyPress: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    style: PropTypes.shape(),
};

KeyboardNavigationPure.defaultProps = {
    style: {},
};

const mapStateToProps = state => ({
    currentNotesUids: currentNotesUidsSelector(state),
    flattenedFolders: flattenedFolderNodesSelector(state),
    highlightedItem: highlightedItemSelector(state),
});

const mapDispatchToProps = dispatch => ({
    dispatchHandleKeyPress: (
        arrowKey,
        notesUids,
        flattenedFolders,
        highlightedItem,
    ) => dispatch(handleArrowKeysPress(
        arrowKey,
        notesUids,
        flattenedFolders,
        highlightedItem,
    )),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const newProps = {
        handleArrowKeyPress: (event) => {
            const arrowKey = getArrowKeyAsString(event.keyCode);

            if (!arrowKey) return;

            event.preventDefault();

            dispatchProps.dispatchHandleKeyPress(
                arrowKey,
                stateProps.currentNotesUids,
                stateProps.flattenedFolders,
                stateProps.highlightedItem,
            );
        },
    };

    return Object.assign({}, ownProps, stateProps, dispatchProps, newProps);
};

export const KeyboardNavigation = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
)(KeyboardNavigationPure);
