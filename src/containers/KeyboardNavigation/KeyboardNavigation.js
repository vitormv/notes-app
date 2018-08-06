import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArrowKeyAsString } from 'src/functions/navigation';
import { HighlightedItemType } from 'src/models/HighlightedItem';
import {
    foldersColumnArrowKeyNavigationAction, navigationHighlightItemAction,
    notesColumnArrowKeyNavigationAction,
} from 'src/store/actions';
import {
    currentNotesUidsSelector,
    flattenedFolderNodesSelector,
    highlightedItemSelector,
} from 'src/store/selectors';

class KeyboardNavigationPure extends React.PureComponent {
    constructor(props) {
        super(props);

        this.navigationNode = null;

        this.handleArrowKeyPress = this.handleArrowKeyPress.bind(this);
    }

    componentDidMount() {
        this.handleFocus();
    }

    handleFocus() {
        const { columnIndex, highlightedItem } = this.props;

        if (
            this.navigationNode
            && (columnIndex === highlightedItem.column)
        ) {
            this.navigationNode.focus();
        }
    }

    handleArrowKeyPress(event) {
        const arrowKey = getArrowKeyAsString(event.keyCode);

        // no arrow key, ignore
        if (!arrowKey) return;

        event.preventDefault();

        const { highlightedItem } = this.props;

        if (highlightedItem.column === 1) {
            this.props.folderNavigationAction(
                arrowKey,
                this.props.flattenedFolders,
                highlightedItem,
            );
        } else {
            this.props.noteNavigationAction(
                arrowKey,
                this.props.currentNotesUids,
                highlightedItem,
            );
        }
    }

    render() {
        const { children } = this.props;

        return (
            <div
                ref={(node) => { this.navigationNode = node; }}
                onKeyDown={this.handleArrowKeyPress}
                role="presentation"
                tabIndex={0}
            >
                {children}
            </div>
        );
    }
}

KeyboardNavigationPure.propTypes = {
    columnIndex: PropTypes.number.isRequired,
    highlightedItem: HighlightedItemType.isRequired,
    children: PropTypes.node.isRequired,
    currentNotesUids: PropTypes.arrayOf(PropTypes.string).isRequired,
    flattenedFolders: PropTypes.shape({}).isRequired,
    folderNavigationAction: PropTypes.func.isRequired,
    noteNavigationAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    currentNotesUids: currentNotesUidsSelector(state),
    flattenedFolders: flattenedFolderNodesSelector(state),
    highlightedItem: highlightedItemSelector(state),
});

const mapDispatchToProps = {
    folderNavigationAction: foldersColumnArrowKeyNavigationAction,
    noteNavigationAction: notesColumnArrowKeyNavigationAction,
    setHighlightedItem: navigationHighlightItemAction,
};

export const KeyboardNavigation = connect(
    mapStateToProps,
    mapDispatchToProps,
)(KeyboardNavigationPure);
