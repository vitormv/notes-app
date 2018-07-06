import React from 'react';
import { SlateImage } from 'src/components/TextEditor/SlateImage';

/**
 * Render a Slate node.
 *
 * @param {Object} props
 * @return {Element}
 */
export const renderSlateNode = (props) => {
    const {
        attributes,
        children,
        node,
        isSelected,
    } = props;
    switch (node.type) {
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>;
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>;
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>;
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;
        case 'list-item':
            return <li {...attributes}>{children}</li>;
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;
        case 'image': {
            const src = node.data.get('src');
            return <SlateImage src={src} isSelected={isSelected} attributes={attributes} />;
        }
        default:
            return null;
    }
};
