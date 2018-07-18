import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';

const Icon = ({
    name, className, onClick, style,
}) => (
    <animated.span style={style} className={`icon-${name} ${className}`} onClick={onClick} />
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    style: PropTypes.shape({}),
    onClick: PropTypes.func,
};

Icon.defaultProps = {
    className: '',
    onClick: () => {},
    style: {},
};

export { Icon };
