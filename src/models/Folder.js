import PropTypes from 'prop-types';

const FolderType = PropTypes.shape({
    uid: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
    classSuffix: PropTypes.string,
    isCollapsed: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    indent: PropTypes.number,
});

const FolderCollectionType = PropTypes.arrayOf(FolderType);

export {
    FolderType,
    FolderCollectionType,
};
