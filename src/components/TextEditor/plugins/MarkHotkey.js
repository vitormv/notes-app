import { isKeyHotkey } from 'is-hotkey';
import { getWordBoundariesAtOffset } from 'src/functions/string/getWordBoundariesAtOffset';

export const applyMark = (value, change, markType) => {
    const { startBlock, startOffset } = value;

    if (value.isCollapsed) {
        const wordOffset = getWordBoundariesAtOffset(startBlock.text, startOffset);
        change
            .moveOffsetsTo(wordOffset[0], wordOffset[1] + 1)
            .toggleMark(markType)
            .moveOffsetsTo(startOffset, startOffset);
    } else {
        change.toggleMark(markType);
    }
};

export const MarkHotkey = ({ type, key }) => {
    // save the function in memory for better performance
    const isValidHotkey = isKeyHotkey(key);

    return {
        onKeyDown(event, change, editor) {
            // Check that the key pressed matches our `key` option.
            if (!isValidHotkey(event)) return null;

            applyMark(editor.value, change, type);

            event.preventDefault();
            return true;
        },
    };
};

