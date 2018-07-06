import React from 'react';
import { Block, Value, Change } from 'slate';
import { Editor, getEventRange, getEventTransfer } from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { FIRST_CHILD_TYPE_INVALID, LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations';
import { hasImageExtension } from 'src/functions/files/hasImageExtension';
import { isUrl } from 'src/functions/files/isUrl';
import { renderSlateNode } from './renderSlateNode';
import { DEFAULT_NODE, Schema } from './Schema';
import './TextEditor.scss';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');
const isEnterKey = isKeyHotkey('enter');
const isBackspaceKey = isKeyHotkey('backspace');
const isSpaceKey = isKeyHotkey('space');

const schema = {
    document: {
        first: { types: ['heading-one'], min: 1 },
        last: { types: ['paragraph'] },
        normalize: (change, reason, { node, child }) => {
            switch (reason) {
                case FIRST_CHILD_TYPE_INVALID: {
                    return change.setNodeByKey(child.key, { type: 'heading-one' });
                }
                case LAST_CHILD_TYPE_INVALID: {
                    const paragraph = Block.create('paragraph');
                    return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
                }
                default:
                    return true;
            }
        },
    },
    blocks: {
        'heading-one': {
            nodes: [{ objects: ['text'] }],
            marks: [{ type: 'underlined' }, { type: 'italic' }],
        },
    },
};

/**
 * A change function to standardize inserting images.
 *
 * @param {Change} change
 * @param {String} src
 * @param {Range} target
 */

const insertImage = (change, src, target) => {
    if (target) {
        change.select(target);
    }

    change.insertBlock({
        type: 'image',
        isVoid: true,
        data: { src },
    });
};

const getMarkdownType = (chars) => {
    switch (chars) {
        case '*':
        case '-':
        case '+':
            return 'list-item';
        case '>':
            return 'block-quote';
        case '#':
            return 'heading-one';
        case '##':
            return 'heading-two';
        case '###':
            return 'heading-three';
        case '####':
            return 'heading-four';
        case '#####':
            return 'heading-five';
        case '######':
            return 'heading-six';
        default:
            return null;
    }
};

class TextEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: Value.fromJSON(Schema),
        };

        this.onChange = this.onChange.bind(this);
        this.hasMark = this.hasMark.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    // On change, update the app's React state with the new editor value.
    onChange({ value }) {
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
        let mark;

        if (isSpaceKey(event)) {
            return this.onSpace(event, change);
        } else if (isBackspaceKey(event)) {
            return this.onBackspace(event, change);
        } else if (isEnterKey(event)) {
            return this.onEnter(event, change);
        } else if (isBoldHotkey(event)) {
            mark = 'bold';
        } else if (isItalicHotkey(event)) {
            mark = 'italic';
        } else if (isUnderlinedHotkey(event)) {
            mark = 'underlined';
        } else if (isCodeHotkey(event)) {
            mark = 'code';
        } else {
            return;
        }

        event.preventDefault();
        change.toggleMark(mark);
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

        if (['numbered-list', 'bulleted-list'].includes(type)) {
            const { value } = this.state;
            const parent = value.document.getParent(value.blocks.first().key);
            isActive = this.hasBlock('list-item') && parent && parent.type === type;
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
            case 'bold':
                return <strong {...attributes}>{children}</strong>;
            case 'code':
                return <code {...attributes}>{children}</code>;
            case 'italic':
                return <em {...attributes}>{children}</em>;
            case 'underlined':
                return <u {...attributes}>{children}</u>;
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
        const change = value.change().toggleMark(type);

        console.log('selected: ', value.texts.toString());

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
        if (type !== 'bulleted-list' && type !== 'numbered-list') {
            const isActive = this.hasBlock(type);
            const isList = this.hasBlock('list-item');

            if (isList) {
                change
                    .setBlocks(isActive ? DEFAULT_NODE : type)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else {
                change.setBlocks(isActive ? DEFAULT_NODE : type);
            }
        } else {
            // Handle the extra wrapping required for list buttons.
            const isList = this.hasBlock('list-item');
            const isType = value.blocks.some(block => !!document.getClosest(block.key, parent => parent.type === type));

            if (isList && isType) {
                change
                    .setBlocks(DEFAULT_NODE)
                    .unwrapBlock('bulleted-list')
                    .unwrapBlock('numbered-list');
            } else if (isList) {
                change
                    .unwrapBlock(type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list')
                    .wrapBlock(type);
            } else {
                change.setBlocks('list-item').wrapBlock(type);
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
        if (type === 'list-item' && startBlock.type === 'list-item') return;
        event.preventDefault();

        change.setBlocks(type);

        if (type === 'list-item') {
            change.wrapBlock('bulleted-list');
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
        if (value.isExpanded) return;
        if (value.startOffset !== 0) return;

        const { startBlock } = value;
        console.log(startBlock.type);
        if (startBlock.type === 'paragraph') return;

        event.preventDefault();
        change.setBlocks('paragraph');

        if (startBlock.type === 'list-item') {
            change.unwrapBlock('bulleted-list');
        }
    }

    onEnter(event, change) {
        const { value } = change;

        if (value.isExpanded) return;

        const { startBlock, startOffset, endOffset } = value;

        if (startOffset === 0 && startBlock.text.length === 0) {
            this.onBackspace(event, change);
            return;
        }

        if (endOffset !== startBlock.text.length) return;

        if (
            startBlock.type !== 'heading-one' &&
            startBlock.type !== 'heading-two' &&
            startBlock.type !== 'heading-three' &&
            startBlock.type !== 'heading-four' &&
            startBlock.type !== 'heading-five' &&
            startBlock.type !== 'heading-six' &&
            startBlock.type !== 'block-quote'
        ) {
            return;
        }

        event.preventDefault();
        change.splitBlock().setBlocks('paragraph');
    }

    onDropOrPaste(event, change, editor) {
        const target = getEventRange(event, change.value);
        if (!target && event.type === 'drop') return;

        const transfer = getEventTransfer(event);
        const { type, text, files } = transfer;

        if (type === 'files') {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split('/');
                if (mime !== 'image') continue;

                reader.addEventListener('load', () => {
                    editor.change((c) => {
                        c.call(insertImage, reader.result, target);
                    });
                });

                reader.readAsDataURL(file);
            }
        }

        if (type === 'text') {
            if (!isUrl(text)) return;
            if (!hasImageExtension(text)) return;
            change.call(insertImage, text, target);
        }
    }

    // Render the editor.
    render() {
        return (
            <div>
                <div className="toolbar">
                    {this.renderBlockButton('heading-one', 'heading')}
                    {this.renderBlockButton('heading-two', 'heading')}
                    <span className="gap" />
                    {this.renderMarkButton('bold', 'bold')}
                    {this.renderMarkButton('italic', 'italic')}
                    {this.renderMarkButton('underlined', 'underline')}
                    <span className="gap" />
                    {this.renderBlockButton('numbered-list', 'list-ol')}
                    {this.renderBlockButton('bulleted-list', 'list-ul')}
                    <span className="gap" />
                    {this.renderMarkButton('code', 'code')}
                    {this.renderBlockButton('block-quote', 'quote-right')}
                </div>
                <Editor
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
                />
            </div>
        );
    }
}

export { TextEditor };
