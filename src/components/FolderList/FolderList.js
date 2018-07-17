import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FolderItem } from 'src/components/FolderItem';
import styled from 'styled-components';

const StyledRename = styled.li`
    padding: 0 3rem 0 3rem;
    box-sizing: border-box;
    
    input {
        background-color: ${props => props.theme.reversed.backgroundLight};
        border: none;
        color: ${props => props.theme.reversed.text};
        padding: 0.6rem 1rem 0.6rem 2rem;
        width: 100%;
        box-sizing: border-box;
        display: block;
        outline: none;
    }
`;

const StyledAddFolder = styled(FolderItem)`
  cursor: pointer;
  &:hover .o-notes-menu__label {
    color: ${props => props.theme.primary};
  }
`;

class FolderList extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isAddingFolder: false,
        };

        this.showInput = this.showInput.bind(this);
        this.hideInput = this.hideInput.bind(this);
        this.handleInputKey = this.handleInputKey.bind(this);
    }

    componentDidUpdate() {
        if (this.state.isAddingFolder && this.inputNode) {
            this.inputNode.focus();
        }
    }

    toggleInput(isVisible) {
        this.setState({ isAddingFolder: isVisible });
    }

    showInput() {
        this.toggleInput(true);
    }

    hideInput() {
        if (this.inputNode && this.inputNode.value.length === 0) {
            this.toggleInput(false);
        }
    }

    handleInputKey(event) {
        if (!this.inputNode) return;

        switch (event.key) {
            case 'Escape':
                this.toggleInput(false);
                break;
            case 'Enter': {
                const { value } = this.inputNode;

                if (this.props.addFolder && value.length > 0) {
                    this.toggleInput(false);
                    this.props.addFolder(value);
                }
                break;
            }
            default:
                // noop
        }
    }

    render() {
        const {
            folders,
            highlightedUid,
            lastActiveFolder,
            onClick,
            onCollapseFolder,
            indent,
        } = this.props;

        return (
            <ul
                className={classNames({
                    'o-notes-menu': true,
                    'o-notes-menu--main': indent === 0,
                })}
            >
                {
                    folders.map(folder => (
                        <FolderItem
                            key={folder.uid}
                            indent={indent}
                            folder={folder}
                            onClick={onClick}
                            onCollapseFolder={onCollapseFolder}
                            lastActiveFolder={lastActiveFolder}
                            highlightedUid={highlightedUid}
                        />
                    ))
                }

                {
                    (this.state.isAddingFolder) &&
                    <StyledRename>
                        <input
                            ref={(el) => { this.inputNode = el; }}
                            type="text"
                            placeholder="folder name"
                            onBlur={this.hideInput}
                            onKeyDown={this.handleInputKey}
                        />
                    </StyledRename>
                }

                {
                    (indent === 0) &&
                    <StyledAddFolder
                        folder={{
                            uid: 'folder:add_new',
                            label: 'add folder',
                            iconClass: 'fas fa-xs fa-plus',
                            classSuffix: 'smaller',
                            isCollapsed: false,
                            children: [],
                        }}
                        onClick={this.showInput}
                        indent={indent}
                    />
                }
            </ul>
        );
    }
}

FolderList.propTypes = {
    folders: PropTypes.arrayOf(PropTypes.shape({
        uid: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        iconClass: PropTypes.string.isRequired,
        classSuffix: PropTypes.string,
        isCollapsed: PropTypes.bool.isRequired,
        children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
        indent: PropTypes.number,
    })).isRequired,
    highlightedUid: PropTypes.string,
    lastActiveFolder: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    onCollapseFolder: PropTypes.func.isRequired,
    indent: PropTypes.number,
    addFolder: PropTypes.func,
};

FolderList.defaultProps = {
    addFolder: null,
    highlightedUid: null,
    lastActiveFolder: null,
    indent: 0,
};

export { FolderList };
