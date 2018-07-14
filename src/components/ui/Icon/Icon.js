import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, className }) => (
    <span className={`icon-${name} ${className}`} />
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

Icon.defaultProps = {
    className: '',
};

export { Icon };
