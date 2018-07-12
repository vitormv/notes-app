import React from 'react';
import { Block, Value } from 'slate';
import { Editor } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { FIRST_CHILD_TYPE_INVALID, LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations';
import { HoverMenu } from 'src/components/TextEditor/HoverMenu';
import { applyMark, MarkHotkey } from 'src/components/TextEditor/plugins/MarkHotkey';
import DropOrPasteImages from 'slate-drop-or-paste-images';
import {
    BLOCK_CHECKLIST_ITEM,
    BLOCK_H1,
    BLOCK_H2,
    BLOCK_H3,
    BLOCK_IMAGE,
    BLOCK_LIST_ITEM,
    BLOCK_LIST_OL,
    BLOCK_LIST_UL,
    BLOCK_PARAGRAPH,
    BLOCK_QUOTE,
    BLOCK_SEPARATOR,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
} from 'src/components/TextEditor/SlateDictionary';
import { renderSlateNode } from './renderSlateNode';
import { DEFAULT_NODE, InitialValue } from './InitialValue';
import './TextEditor.scss';

const isEnterKey = isKeyHotkey('enter');
const isBackspaceKey = isKeyHotkey('backspace');
const isSpaceKey = isKeyHotkey('space');

const schema = {
    document: {
        first: { types: [BLOCK_H1], min: 1 },
        last: { types: [BLOCK_PARAGRAPH] },
        normalize: (change, reason, { node, child }) => {
            switch (reason) {
                case FIRST_CHILD_TYPE_INVALID: {
                    return change.setNodeByKey(child.key, { type: BLOCK_H1 });
                }
                case LAST_CHILD_TYPE_INVALID: {
                    const paragraph = Block.create(BLOCK_PARAGRAPH);
                    return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
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

const plugins = [
    MarkHotkey({ type: MARK_BOLD, key: 'mod+b' }),
    MarkHotkey({ type: MARK_UNDERLINE, key: 'mod+u' }),
    MarkHotkey({ type: MARK_ITALIC, key: 'mod+i' }),
    MarkHotkey({ type: MARK_CODE, key: 'mod+shift+c' }),
    MarkHotkey({ type: MARK_STRIKETHROUGH, key: 'mod+shift+k' }),
    DropOrPasteImages({
        extensions: ['png', 'jpg', 'jpeg', 'gif', 'webm', 'tiff'],
        insertImage: (transform, file) => transform.insertBlock({
            type: BLOCK_IMAGE,
            isVoid: true,
            data: { src: file },
        }),
    }),
];

const getMarkdownType = (chars) => {
    switch (chars) {
        case '*':
        case '-':
        case '+':
            return BLOCK_LIST_ITEM;
        case '>':
            return BLOCK_QUOTE;
        case '#':
            return BLOCK_H1;
        case '##':
            return BLOCK_H2;
        case '###':
            return BLOCK_H3;
        case '[]':
        case '[ ]':
            return BLOCK_CHECKLIST_ITEM;
        case '---':
            return BLOCK_SEPARATOR;
        default:
            return null;
    }
};

class TextEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: Value.fromJSON(InitialValue),
            isHoverMenuVisible: false,
        };

        this.onChange = this.onChange.bind(this);
        this.hasMark = this.hasMark.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    // On change, update the app's React state with the new editor value.
    onChange({ value }) {
        if (value.isBlurred || value.isEmpty) {
            this.setState({ isHoverMenuVisible: false });
        } else {
            this.setState({ isHoverMenuVisible: true });
        }

        this.setState({ value });
    }

    /**
     * On key down, if it's a formatting command toggle a mark.
     *
     * @param {Event} event
     * @param {Change} change
     * @return {Change}
     */
    onKeyDown(event, change) {
        if (isSpaceKey(event)) {
            return this.onSpace(event, change);
        } else if (isBackspaceKey(event)) {
            return this.onBackspace(event, change);
        } else if (isEnterKey(event)) {
            return this.onEnter(event, change);
        }

        return null;
    }

    hasMark(type) {
        const { value } = this.state;

        return value.activeMarks.some(mark => mark.type === type);
    }

    hasBlock(type) {
        const { value } = this.state;
        return value.blocks.some(node => node.type === type);
    }

    renderMarkButton(type, icon) {
        const isActive = this.hasMark(type);

        return (
            <span
                className={isActive ? 'active' : ''}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <i className={`icon-${icon}`} />
            </span>
        );
    }

    /**
     * Render a block-toggling toolbar button.
     *
     * @param {String} type
     * @param {String} icon
     * @return {Element}
     */
    renderBlockButton(type, icon) {
        let isActive = this.hasBlock(type);

        if ([BLOCK_LIST_OL, BLOCK_LIST_UL].includes(type)) {
            const { value } = this.state;
            const parent = value.document.getParent(value.blocks.first().key);
            isActive = this.hasBlock(BLOCK_LIST_ITEM) && parent && parent.type === type;
        }

        return (
            <span
                className={isActive ? 'active' : ''}
                onMouseDown={event => this.onClickBlock(event, type)}
            >
                <i className={`icon-${icon}`} />
            </span>
        );
    }

    /**
     * Render a Slate mark.
     *
     * @param {Object} props
     * @return {Element}
     */
    renderMark(props) {
        const { children, mark, attributes } = props;

        switch (mark.type) {
            case MARK_BOLD:
                return <strong {...attributes}>{children}</strong>;
            case MARK_CODE:
                return <code {...attributes}>{children}</code>;
            case MARK_ITALIC:
                return <em {...attributes}>{children}</em>;
            case MARK_UNDERLINE:
                return <u {...attributes}>{children}</u>;
            case MARK_STRIKETHROUGH:
                return <span className="strikethrough" {...attributes}>{children}</span>;
            default:
                return null;
        }
    }

    /**
     * When a mark button is clicked, toggle the current mark.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickMark(event, type) {
        event.preventDefault();

        const { value } = this.state;
        const change = value.change();

        applyMark(value, change, type);

        this.onChange(change);
    }

    /**
     * When a block button is clicked, toggle the block type.
     *
     * @param {Event} event
     * @param {String} type
     */

    onClickBlock(event, type) {
        event.preventDefault();
        const { value } = this.state;
        const change = value.change();
        const { document } = value;

        // Handle everything but list buttons.
        if (type !== BLOCK_LIST_OL && type !== BLOCK_LIST_UL) {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock(BLOCK_LIST_ITEM);

            if (isList) {
                change
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock(BLOCK_LIST_OL)
                    .unwrapBlock(BLOCK_LIST_UL);
            } else {
                change.setBlocks(isActive ? DEFAULT_NODE : type);
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock(BLOCK_LIST_ITEM);
            const isType = value.blocks.some(block => !!document.getClosest(block.key, parent => parent.type === type));

            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock(BLOCK_LIST_OL)
                    .unwrapBlock(BLOCK_LIST_UL);
            } else if (isList) {
                change
                    .unwrapBlock(type === BLOCK_LIST_UL ? BLOCK_LIST_OL : BLOCK_LIST_UL)
                    .wrapBlock(type);
            } else {
                change.setBlocks(BLOCK_LIST_ITEM).wrapBlock(type);
            }
        }

        this.onChange(change);
    }

    onSpace(event, change) {
        const { value } = change;
        if (value.isExpanded) return;

        const { startBlock, startOffset } = value;
        const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '');
        const type = getMarkdownType(chars);

        if (!type) return;
        if (type === BLOCK_LIST_ITEM && startBlock.type === BLOCK_LIST_ITEM) return;
        event.preventDefault();

        change.setBlocks(type);

        if (type === BLOCK_LIST_ITEM) {
            change.wrapBlock(BLOCK_LIST_UL);
        }

        change.extendToStartOf(startBlock).delete();
    }

    /**
     * On backspace, if at the start of a non-paragraph, convert it back into a
     * paragraph node.
     *
     * @param {Event} event
     * @param {Change} change
     */

    onBackspace(event, change) {
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
    }

    onEnter(event, change) {
        const { value } = change;

        if (value.isExpanded) return null;

        const { startBlock, startOffset, endOffset } = value;

        if (startOffset === 0 && startBlock.text.length === 0) {
            return this.onBackspace(event, change);
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
            startBlock.type !== BLOCK_QUOTE
        ) {
            return null;
        }

        event.preventDefault();
        change.splitBlock().setBlocks(BLOCK_PARAGRAPH);
        return false;
    }

    // Render the editor.
    render() {
        return (
            <div className="editor-wrapper">
                <HoverMenu
                    value={this.state.value}
                    onChange={this.onChange}
                    isVisible={this.state.isHoverMenuVisible}
                />
                <Editor
                    className="editor"
                    spellCheck
                    autoFocus
                    placeholder="Enter some text..."
                    value={this.state.value}
                    onChange={this.onChange}
                    schema={schema}
                    onKeyDown={this.onKeyDown}
                    onDrop={this.onDropOrPaste}
                    onPaste={this.onDropOrPaste}
                    renderNode={renderSlateNode}
                    renderMark={this.renderMark}
                    plugins={plugins}
                />
                <div className="toolbar">
                    {this.renderBlockButton(BLOCK_H1, 'heading')}
                    {this.renderBlockButton(BLOCK_H2, 'heading')}
                    {this.renderBlockButton(BLOCK_H3, 'heading')}
                    <span className="gap" />
                    {this.renderBlockButton(BLOCK_LIST_OL, 'list-ol')}
                    {this.renderBlockButton(BLOCK_LIST_UL, 'list-ul')}
                    {this.renderBlockButton(BLOCK_CHECKLIST_ITEM, 'checkbox')}
                    <span className="gap" />
                    {this.renderBlockButton(BLOCK_QUOTE, 'quote-right')}
                    {this.renderBlockButton(BLOCK_SEPARATOR, 'quote-right')}
                </div>
            </div>
        );
    }
}

export { TextEditor };
