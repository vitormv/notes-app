import { Block } from 'slate';
import { CHILD_TYPE_INVALID, FIRST_CHILD_TYPE_INVALID, LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations';
import {
    ALLOWED_BLOCK_TYPES,
    BLOCK_H1,
    BLOCK_PARAGRAPH,
    MARK_ITALIC,
    MARK_UNDERLINE,
} from 'src/components/TextEditor/SlateDictionary';

const Schema = {
    document: {
        first: { types: [BLOCK_H1], min: 1 },
        last: { types: [BLOCK_PARAGRAPH] },
        nodes: [
            { types: ALLOWED_BLOCK_TYPES },
        ],
        normalize: (change, reason, { node, child }) => {
            switch (reason) {
                case FIRST_CHILD_TYPE_INVALID: {
                    return change.setNodeByKey(child.key, { type: BLOCK_H1 });
                }
                case LAST_CHILD_TYPE_INVALID: {
                    const paragraph = Block.create(BLOCK_PARAGRAPH);
                    return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
                }
                case CHILD_TYPE_INVALID: {
                    return change.setNodeByKey(child.key, { type: BLOCK_PARAGRAPH });
                }
                default:
                    return true;
            }
        },
    },
    blocks: {
        [BLOCK_H1]: {
            nodes: [{ objects: ['text'] }],
            marks: [{ type: MARK_UNDERLINE }, { type: MARK_ITALIC }],
        },
    },
};

export { Schema };
