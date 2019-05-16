import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Editor } from 'slate-react';
import Plain from 'slate-plain-serializer';
import { HoverMenu } from 'src/components/TextEditor/HoverMenu';
import { ExpandMarkdownSyntax } from 'src/components/TextEditor/plugins/ExpandMarkdownSyntax';
import { applyMark, MarkHotkey } from 'src/components/TextEditor/plugins/MarkHotkey';
import DropOrPasteImages from 'slate-drop-or-paste-images';
import { Schema } from 'src/components/TextEditor/Schema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    BLOCK_CHECKLIST_ITEM,
    BLOCK_H1,
    BLOCK_H2,
    BLOCK_H3,
    BLOCK_IMAGE,
    BLOCK_LIST_ITEM,
    BLOCK_LIST_OL,
    BLOCK_LIST_UL,
    BLOCK_QUOTE,
    BLOCK_SEPARATOR,
    DEFAULT_NODE,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_UNDERLINE,
} from 'src/components/TextEditor/SlateDictionary';
import { renderSlateNode } from './renderSlateNode';
import styles from './TextEditor.scss';

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
    ExpandMarkdownSyntax(),
];

class TextEditor extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: Plain.deserialize(props.noteContent),
            isHoverMenuVisible: false,
        };

        // keep track of selections internally, so we know when to rerender the mark popup
        this.selectionLength = false;

        this.onChange = this.onChange.bind(this);
        this.hasMark = this.hasMark.bind(this);
    }

    onChange({ value }) {
        const selectionLength = [
            value.focusBlock.key,
            value.startOffset,
            value.endOffset,
        ].join('.');

        if (value.isBlurred || value.isEmpty || (this.selectionLength === selectionLength)) {
            this.setState({ isHoverMenuVisible: false });
        } else {
            this.selectionLength = selectionLength;
            this.setState({ isHoverMenuVisible: true });
        }

        this.setState({ value });
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
                className={classNames({
                    [styles.active]: isActive,
                })}
                onMouseDown={event => this.onClickMark(event, type)}
            >
                <FontAwesomeIcon icon={icon} />
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
                className={classNames({
                    [styles.active]: isActive,
                })}
                onMouseDown={event => this.onClickBlock(event, type)}
            >
                <FontAwesomeIcon icon={icon} />
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
            const isType = value.blocks.some(block => (
                !!document.getClosest(block.key, parent => parent.type === type)
            ));

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

    // Render the editor.
    render() {
        return (
            <div className={styles.editorWrapper}>
                <HoverMenu
                    value={this.state.value}
                    onChange={this.onChange}
                    isVisible={this.state.isHoverMenuVisible}
                />
                <Editor
                    className={styles.editor}
                    spellCheck={false}
                    placeholder="Enter some text..."
                    value={this.state.value}
                    onChange={this.onChange}
                    schema={Schema}
                    onDrop={this.onDropOrPaste}
                    onPaste={this.onDropOrPaste}
                    renderNode={renderSlateNode}
                    renderMark={this.renderMark}
                    plugins={plugins}
                />
                <div className={styles.toolbar}>
                    {this.renderBlockButton(BLOCK_H1, 'heading')}
                    {this.renderBlockButton(BLOCK_H2, 'heading')}
                    {this.renderBlockButton(BLOCK_H3, 'heading')}
                    <span className={styles.gap} />
                    {this.renderBlockButton(BLOCK_LIST_OL, 'list-ol')}
                    {this.renderBlockButton(BLOCK_LIST_UL, 'list-ul')}
                    {this.renderBlockButton(BLOCK_CHECKLIST_ITEM, 'check')}
                    <span className={styles.gap} />
                    {this.renderBlockButton(BLOCK_QUOTE, 'quote-right')}
                    {this.renderBlockButton(BLOCK_SEPARATOR, 'quote-right')}
                </div>
            </div>
        );
    }
}

TextEditor.propTypes = {
    noteContent: PropTypes.string.isRequired,
};

export { TextEditor };
