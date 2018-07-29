import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';
import styled from 'styled-components';
import { Icon } from 'src/components/ui/Icon';
import { Show } from 'src/components/ui/Show';

const StyledFolderItemLabel = styled(animated.div)`
    cursor: pointer;
    user-select: none;
    outline: none;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    height: 2.8rem;
    padding: 0.6rem 1.5rem;
    display: flex;
    z-index: 1;
    background-color: ${props => props.theme.ui.folder[props.status].background};
    color: ${props => props.theme.ui.folder[props.status].color};

    > .icons {
        width: 3rem;
        min-width: 3rem;
        text-align: center;
        opacity: 0.3;
        position: relative;
    }
    
    > .label {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

const StyledCollapseToggle = styled.div`
    display: ${({ hasChildren }) => (hasChildren ? 'block' : 'none')};
    position: absolute;
    opacity: 0.5;
    transition: transform .15s ${props => props.theme.animation.fast};
    left: -0.8rem;
    padding: 0.3rem;
    top: -0.1rem;
    
    transform: rotateZ(${({ isCollapsed }) => (isCollapsed ? '-90deg' : '0')});
`;

const FolderItemLabel = ({
    label,
    icon,
    indent,
    isHighlighted,
    isUnhighlighted,
    hasChildren,
    isCollapsed,
    onCollapseFolder,
    onClick,
    style,
}) => (
    <StyledFolderItemLabel
        status={isHighlighted ? 'highlighted' : (isUnhighlighted ? 'unhighlighted' : 'default')}
        style={{
            ...style,
            paddingLeft: `${((indent + 1) * 2)}rem`,
        }}
        onClick={onClick}
    >
        <div className="icons">
            <Icon name={icon} />

            <Show when={hasChildren}>
                <StyledCollapseToggle
                    isCollapsed={isCollapsed}
                    hasChildren={hasChildren}
                    onClick={onCollapseFolder}
                >
                    <Icon name="angle-down" />
                </StyledCollapseToggle>
            </Show>
        </div>

        <div className="label" title={label}>{label}</div>
    </StyledFolderItemLabel>
);

FolderItemLabel.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    hasChildren: PropTypes.bool,
    isHighlighted: PropTypes.bool,
    isUnhighlighted: PropTypes.bool,
    isCollapsed: PropTypes.bool,
    onCollapseFolder: PropTypes.func,
    indent: PropTypes.number,
    onClick: PropTypes.func,
    style: PropTypes.shape({}),
};

FolderItemLabel.defaultProps = {
    indent: 0,
    hasChildren: false,
    isHighlighted: false,
    isUnhighlighted: false,
    isCollapsed: false,
    onCollapseFolder: () => {},
    onClick: () => {},
    style: {},
};

export { FolderItemLabel };
