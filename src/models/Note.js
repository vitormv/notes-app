import PropTypes from 'prop-types';

const NoteType = PropTypes.shape({
    uid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
});

const NoteCollectionType = PropTypes.arrayOf(NoteType);

export {
    NoteType,
    NoteCollectionType,
};
