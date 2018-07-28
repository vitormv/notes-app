import React from 'react';
import PropTypes from 'prop-types';
import { Spring } from 'react-spring';
import { FolderItemLabel } from 'src/components/folders/FolderItemLabel';

const AddFolderButton = ({ isAdding, indent, onClick }) => (
    <Spring
        native
        to={{
            transform: isAdding ? 'translateY(110%)' : 'translateY(10%)',
            opacity: isAdding ? '0' : '1',
        }}
    >
        {styles => (
            <FolderItemLabel
                style={styles}
                label="add folder"
                icon="plus"
                indent={indent}
                onClick={onClick}
                isSmall
            />
        )}
    </Spring>
);

AddFolderButton.propTypes = {
    isAdding: PropTypes.bool.isRequired,
    indent: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired,
};

export { AddFolderButton };
