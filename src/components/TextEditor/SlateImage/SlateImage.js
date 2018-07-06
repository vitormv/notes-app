import React from 'react';
import PropTypes from 'prop-types';
import classsNames from 'classnames';
import './SlateImage.scss';

const SlateImage = ({ src, isSelected, attributes }) => {
    return (
        <div
            className={classsNames({
                'slate-image': true,
                'slate-image--selected': isSelected,
            })}
            {...attributes}
        >
            <span className="slate-image__remove">
                <i className="icon-times" />
            </span>
            <img src={src} />
        </div>
    );
};

SlateImage.propTypes = {
    src: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    attributes: PropTypes.shape({}),
};

export { SlateImage };
