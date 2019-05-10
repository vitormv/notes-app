import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-spring';

const mergeStyleIntoChildren = (styles, children) => {
    const nodes = Array.isArray(children) ? children : [children];

    return nodes.map(child => React.cloneElement(child, {
        ...child.props,
        style: {
            ...child.props.style,
            ...styles,
        },
    }));
};

const MountAnimation = ({ when, children, ...rest }) => (
    <Transition
        {...rest}
        native
    >
        {
            (when) ? (styles => mergeStyleIntoChildren(styles, children)) : () => null
        }
    </Transition>
);

MountAnimation.propTypes = {
    when: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    from: PropTypes.shape({}).isRequired,
    enter: PropTypes.shape({}).isRequired,
    leave: PropTypes.shape({}).isRequired,
};

export { MountAnimation };
