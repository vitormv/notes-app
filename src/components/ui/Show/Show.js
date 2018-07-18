import PropTypes from 'prop-types';

export const Show = ({
    when,
    children,
}) => (when ? children : null);

Show.propTypes = {
    when: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};
