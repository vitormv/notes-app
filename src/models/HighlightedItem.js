import PropTypes from 'prop-types';

const HighlightedItemType = PropTypes.shape({
    column: PropTypes.oneOf([1, 2, null]),
    itemUid: PropTypes.string,
});

export { HighlightedItemType };
