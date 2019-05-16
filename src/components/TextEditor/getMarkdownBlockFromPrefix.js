import {
    BLOCK_CHECKLIST_ITEM,
    BLOCK_H1,
    BLOCK_H2,
    BLOCK_H3,
    BLOCK_LIST_ITEM,
    BLOCK_QUOTE,
    BLOCK_SEPARATOR,
} from 'src/components/TextEditor/SlateDictionary';

const markdownSyntaxMapping = {
    '*': BLOCK_LIST_ITEM,
    '-': BLOCK_LIST_ITEM,
    '+': BLOCK_LIST_ITEM,
    '>': BLOCK_QUOTE,
    '#': BLOCK_H1,
    'h1.': BLOCK_H1,
    '##': BLOCK_H2,
    'h2.': BLOCK_H2,
    '###': BLOCK_H3,
    'h3.': BLOCK_H3,
    '[]': BLOCK_CHECKLIST_ITEM,
    '[ ]': BLOCK_CHECKLIST_ITEM,
    '---': BLOCK_SEPARATOR,
    ___: BLOCK_SEPARATOR,
};

const getMarkdownBlockFromPrefix = (
    chars => markdownSyntaxMapping[chars] || null
);

export { getMarkdownBlockFromPrefix };
