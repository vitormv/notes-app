import React from 'react';
import { CheckListItem } from 'src/components/TextEditor/CheckListItem';
import {
    BLOCK_CHECKLIST_ITEM,
    BLOCK_H1,
    BLOCK_H2,
    BLOCK_H3,
    BLOCK_IMAGE,
    BLOCK_LIST_ITEM,
    BLOCK_LIST_OL,
    BLOCK_LIST_UL,
    BLOCK_QUOTE, BLOCK_SEPARATOR,
} from 'src/components/TextEditor/SlateDictionary';
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
        editor,
    } = props;
    switch (node.type) {
        case BLOCK_H1:
            return <h1 {...attributes}>{children}</h1>;
        case BLOCK_H2:
            return <h2 {...attributes}>{children}</h2>;
        case BLOCK_H3:
            return <h3 {...attributes}>{children}</h3>;
        case BLOCK_QUOTE:
            return <blockquote {...attributes}>{children}</blockquote>;
        case BLOCK_LIST_UL:
            return <ul {...attributes}>{children}</ul>;
        case BLOCK_LIST_ITEM:
            return <li {...attributes}>{children}</li>;
        case BLOCK_LIST_OL:
            return <ol {...attributes}>{children}</ol>;
        case BLOCK_IMAGE: {
            const change = editor.value.change();

            return (
                <SlateImage
                    src={node.data.get('src')}
                    isSelected={isSelected}
                    attributes={attributes}
                    onRemove={() => {
                        change.removeNodeByKey(node.key);
                        editor.onChange(change);
                    }}
                />
            );
        }
        case BLOCK_CHECKLIST_ITEM:
            return <CheckListItem {...props} />;
        case BLOCK_SEPARATOR:
            return <div {...attributes} className="editor-separator-line"><hr /></div>;
        default:
            return null;
    }
};
