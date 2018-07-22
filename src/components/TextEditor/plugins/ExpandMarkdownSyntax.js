import { isKeyHotkey } from 'is-hotkey';
import { getMarkdownBlockFromPrefix } from 'src/components/TextEditor/getMarkdownBlockFromPrefix';
import {
    BLOCK_CHECKLIST_ITEM,
    BLOCK_H1, BLOCK_H2, BLOCK_H3,
    BLOCK_LIST_ITEM, BLOCK_LIST_OL, BLOCK_LIST_UL,
    BLOCK_PARAGRAPH, BLOCK_QUOTE,
} from 'src/components/TextEditor/SlateDictionary';

const onSpace = (event, change) => {
    const { value } = change;
    if (value.isExpanded) return;

    const { startBlock, startOffset } = value;
    const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '');
    const type = getMarkdownBlockFromPrefix(chars);

    if (!type) return;
    if (type === BLOCK_LIST_ITEM && startBlock.type === BLOCK_LIST_ITEM) return;
    event.preventDefault();

    change.setBlocks(type);

    if (type === BLOCK_LIST_ITEM) {
        change.wrapBlock(BLOCK_LIST_UL);
    }

    change.extendToStartOf(startBlock).delete();
};

/**
 * On backspace, if at the start of a non-paragraph, convert it back into a
 * paragraph node.
 *
 * @param {Event} event
 * @param {Change} change
 */

const onBackspace = (event, change) => {
    const { value } = change;
    if (value.isExpanded) return null;
    if (value.startOffset !== 0) return null;

    const { startBlock } = value;
    if (startBlock.type === BLOCK_PARAGRAPH) return null;

    event.preventDefault();
    change.setBlocks(BLOCK_PARAGRAPH);

    if (startBlock.type === BLOCK_LIST_ITEM) {
        change.unwrapBlock(BLOCK_LIST_OL).unwrapBlock(BLOCK_LIST_UL);
        return false;
    }

    return true;
};

const onEnter = (event, change) => {
    const { value } = change;

    if (value.isExpanded) return null;

    const { startBlock, startOffset, endOffset } = value;

    if (startOffset === 0 && startBlock.text.length === 0) {
        return onBackspace(event, change);
    }

    if (endOffset !== startBlock.text.length) return null;

    if (startBlock.type === BLOCK_CHECKLIST_ITEM) {
        change.splitBlock().setBlocks({ data: { checked: false } });
        return true;
    }

    if (
        startBlock.type !== BLOCK_H1 &&
        startBlock.type !== BLOCK_H2 &&
        startBlock.type !== BLOCK_H3 &&
        startBlock.type !== BLOCK_QUOTE &&
        startBlock.type !== BLOCK_PARAGRAPH
    ) {
        return null;
    }

    change.splitBlock().setBlocks(BLOCK_PARAGRAPH);

    event.preventDefault();
    return false;
};


const ExpandMarkdownSyntax = () => {
    const isEnterKey = isKeyHotkey('enter');
    const isBackspaceKey = isKeyHotkey('backspace');
    const isSpaceKey = isKeyHotkey('space');

    return {
        onKeyDown: (event, change) => {
            if (isSpaceKey(event)) {
                return onSpace(event, change);
            } else if (isBackspaceKey(event)) {
                return onBackspace(event, change);
            } else if (isEnterKey(event)) {
                return onEnter(event, change);
            }

            return null;
        },
    };
};

export { ExpandMarkdownSyntax };
