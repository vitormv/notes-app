import {
    BLOCK_CHECKLIST_ITEM,
    BLOCK_H1,
    BLOCK_H2,
    BLOCK_H3,
    BLOCK_LIST_ITEM,
    BLOCK_QUOTE,
    BLOCK_SEPARATOR,
} from 'src/components/TextEditor/SlateDictionary';

const getMarkdownBlockFromPrefix = (chars) => {
    switch (chars) {
        case '*':
        case '-':
        case '+':
            return BLOCK_LIST_ITEM;
        case '>':
            return BLOCK_QUOTE;
        case '#':
        case 'h1.':
            return BLOCK_H1;
        case '##':
        case 'h2.':
            return BLOCK_H2;
        case '###':
        case 'h3.':
            return BLOCK_H3;
        case '[]':
        case '[ ]':
            return BLOCK_CHECKLIST_ITEM;
        case '---':
        case '___':
            return BLOCK_SEPARATOR;
        default:
            return null;
    }
};

export { getMarkdownBlockFromPrefix };
