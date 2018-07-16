import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ name, className, onClick }) => (
    <span className={`icon-${name} ${className}`} onClick={onClick} />
);

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

Icon.defaultProps = {
    className: '',
    onClick: () => {},
};

export { Icon };
