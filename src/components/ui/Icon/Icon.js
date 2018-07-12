import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, className, ...rest }) => (
    <span className={`icon-${name} ${className}`} {...rest} />
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Icon.defaultProps = {
    className: '',
};

export { Icon };
