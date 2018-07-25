import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { shouldUpdate } from 'recompose';
import isEqual from 'lodash/isEqual';
import { ContextMenu } from 'src/components/folders/ContextMenu';
import { FolderList } from 'src/components/folders/FolderList';
import { FolderItemLabel } from 'src/components/folders/FolderItemLabel';
import { animated, Spring } from 'react-spring';
import { hasAnyHighlightedChild } from 'src/functions/folders';
import { FolderType } from 'src/models/Folder';

export const folderItemHeight = 28;

const calculateItemHeight = (folder) => {
    let height = folderItemHeight;

    if (!folder.isCollapsed) {
        folder.children.forEach((child) => {
            height += calculateItemHeight(child);
        });
    }

    return height;
};

class FolderItemPure extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isContextMenuActive: false,
        };

        this.hideFolderOptions = this.hideFolderOptions.bind(this);
        this.onCollapseFolder = this.onCollapseFolder.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
    }

    componentDidMount() {
        this.folderCoordinates = this.folderNode.node.getBoundingClientRect();
    }

    componentDidUpdate() {
        this.folderCoordinates = this.folderNode.node.getBoundingClientRect();
    }

    onContextMenu(event) {
        event.preventDefault();
        event.stopPropagation();

        this.clickCoordinates = { x: event.pageX, y: event.pageY };

        this.setState({ isContextMenuActive: true });
    }

    onCollapseFolder(event) {
        event.stopPropagation();

        const {
            folder, highlightedUid, unhighlightedUid, onClick, onCollapseFolder,
        } = this.props;

        // when the folder being collapsed has a (un)highlighted child,
        // focus on this folder first
        if (hasAnyHighlightedChild(folder, highlightedUid, unhighlightedUid)) onClick(folder.uid);
        // if (hasAnyHighlightedChild(folder, unhighlightedUid)) onClick(folder.uid);

        onCollapseFolder(folder.uid, !folder.isCollapsed);
    }

    hideFolderOptions() {
        this.setState({ isContextMenuActive: false });
    }

    render() {
        const {
            folder,
            className,
            highlightedUid,
            unhighlightedUid,
            onClick,
            onCollapseFolder,
            indent,
        } = this.props;

        return (
            <Spring
                config={{ tension: 210, friction: 24 }}
                native
                to={{
                    height: `${calculateItemHeight(folder) / 10}rem`,
                }}
                tabindex={-1}
            >
                {styles => (
                    <animated.li
                        ref={(el) => { this.folderNode = el; }}
                        className={classNames({
                            'o-notes-menu__item': true,
                            'o-notes-menu__item--collapsed': folder.isCollapsed,
                            [className]: true,
                        })}
                        key={folder.uid}
                        onClick={(e) => { e.stopPropagation(); onClick(folder.uid); }}
                        tabIndex={-1}
                        style={styles}
                        onBlur={this.hideFolderOptions}
                        onContextMenu={this.onContextMenu}
                    >
                        <FolderItemLabel
                            label={folder.label}
                            icon={folder.iconClass}
                            indent={indent}
                            hasChildren={folder.children.length > 0}
                            isUnhighlighted={unhighlightedUid === folder.uid}
                            isHighlighted={highlightedUid === folder.uid}
                            isCollapsed={folder.isCollapsed}
                            onCollapseFolder={this.onCollapseFolder}
                        />

                        {this.state.isContextMenuActive && (
                            <ContextMenu
                                parentCoordinates={this.folderCoordinates}
                                mouse={this.clickCoordinates}
                            />
                        )}

                        {folder.children.length > 0 && (
                            <Spring
                                config={{ tension: 210, friction: 24 }}
                                native
                                to={{
                                    transform: folder.isCollapsed ? 'top-100%)' : 'translateY(0%)',
                                    opacity: folder.isCollapsed ? '0' : '1',
                                }}
                            >
                                {subStyles => (
                                    <FolderList
                                        style={subStyles}
                                        isCollapsed={folder.isCollapsed}
                                        folders={folder.children}
                                        highlightedUid={highlightedUid}
                                        unhighlightedUid={unhighlightedUid}
                                        onClick={onClick}
                                        onCollapseFolder={onCollapseFolder}
                                        indent={indent + 1}
                                    />
                                )}
                            </Spring>
                        )}
                    </animated.li>
                )}
            </Spring>
        );
    }
}

FolderItemPure.propTypes = {
    folder: FolderType.isRequired,
    onClick: PropTypes.func,
    onCollapseFolder: PropTypes.func,
    highlightedUid: PropTypes.string,
    unhighlightedUid: PropTypes.string,
    className: PropTypes.string,
    indent: PropTypes.number,
};

FolderItemPure.defaultProps = {
    onClick: () => {},
    onCollapseFolder: () => {},
    highlightedUid: null,
    unhighlightedUid: null,
    className: '',
    indent: 0,
};

export const FolderItem = shouldUpdate((props, nextProps) => (
    !isEqual(props, nextProps)
))(FolderItemPure);
