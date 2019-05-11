import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { shouldUpdate } from 'recompose';
import isEqual from 'lodash/isEqual';
import { ContextMenu } from 'src/components/folders/ContextMenu';
import { FolderList } from 'src/components/folders/FolderList';
import { FolderItemLabel } from 'src/components/folders/FolderItemLabel';
import { animated, Spring } from 'react-spring';
import { RenameFolder } from 'src/components/folders/RenameFolder';
import { FolderType } from 'src/models/Folder';
import styles from './FolderItem.scss';

class FolderItemPure extends React.PureComponent {
    static calculateItemHeight(folder) {
        let height = 28;

        if (!folder.isCollapsed) {
            folder.children.forEach((child) => {
                height += this.calculateItemHeight(child);
            });
        }

        return height;
    }

    constructor(props) {
        super(props);

        this.state = {
            isContextMenuActive: false,
            isEditing: false,
            mouseCoordinates: { x: 0, y: 0 },
        };

        this.hideFolderOptions = this.hideFolderOptions.bind(this);
        this.onCollapseFolder = this.onCollapseFolder.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.toggleEditing = this.toggleEditing.bind(this);
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

        // disable menu for default folders
        if (this.props.folder.isDefault === true) return;

        this.setState({
            isContextMenuActive: true,
            mouseCoordinates: { x: event.pageX, y: event.pageY },
        });
    }

    onCollapseFolder(event) {
        event.stopPropagation();

        const { folder, onCollapseFolder } = this.props;

        onCollapseFolder(folder.uid, !folder.isCollapsed);
    }

    toggleEditing(isEditing) {
        this.setState({ isEditing });
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
            onDeleteFolder,
            onRenameFolder,
            indent,
        } = this.props;

        return (
            <Spring
                config={{ tension: 210, friction: 24 }}
                native
                to={{
                    height: `${this.constructor.calculateItemHeight(folder) / 10}rem`,
                }}
                tabindex={-1}
            >
                {dynamicStyles => (
                    <animated.li
                        ref={(el) => { this.folderNode = el; }}
                        className={classNames({
                            [styles.item]: true,
                            [styles.itemCollapsed]: folder.isCollapsed,
                            [className]: true,
                        })}
                        key={folder.uid}
                        onClick={(e) => { e.stopPropagation(); onClick(folder.uid); }}
                        tabIndex={-1}
                        style={dynamicStyles}
                        onContextMenu={this.onContextMenu}
                    >
                        <RenameFolder
                            isInputVisible={this.state.isEditing}
                            defaultInputValue={folder.label}
                            toggleInput={this.toggleEditing}
                            indent={indent}
                            renderElement={renameFolderStyle => (
                                <FolderItemLabel
                                    style={renameFolderStyle}
                                    label={folder.label}
                                    icon={folder.iconClass}
                                    indent={indent}
                                    hasChildren={folder.children.length > 0}
                                    isUnhighlighted={unhighlightedUid === folder.uid}
                                    isHighlighted={highlightedUid === folder.uid}
                                    isCollapsed={folder.isCollapsed}
                                    onCollapseFolder={this.onCollapseFolder}
                                />
                            )}
                            onEnter={(value) => { onRenameFolder(folder.uid, value); }}
                        />

                        {this.state.isContextMenuActive && (
                            <ContextMenu
                                parentCoordinates={this.folderCoordinates}
                                mouse={this.state.mouseCoordinates}
                                onDelete={() => { onDeleteFolder(folder.uid); }}
                                onRename={() => { this.toggleEditing(true); }}
                                closeMenu={() => { this.hideFolderOptions(); }}
                            />
                        )}

                        {folder.children.length > 0 && (
                            <Spring
                                config={{ tension: 210, friction: 24 }}
                                native
                                to={{
                                    transform: folder.isCollapsed ? 'translateY(-100%)' : 'translateY(0%)',
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
                                        onDeleteFolder={onDeleteFolder}
                                        onRenameFolder={onRenameFolder}
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
    onDeleteFolder: PropTypes.func.isRequired,
    onRenameFolder: PropTypes.func.isRequired,
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
