import React from 'react';
import './CheckListItem.scss';

class CheckListItem extends React.Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        const checked = event.target.checked;
        const { editor, node } = this.props;

        editor.change(c => c.setNodeByKey(node.key, { data: { checked } }));
    }

    render() {
        const {
            attributes, children, node, readOnly,
        } = this.props;
        const checked = node.data.get('checked');
        return (
            <div className="check-list" {...attributes}>
                <span className="checkbox-wrapper" contentEditable={false}>
                    <input type="checkbox" checked={checked} onChange={this.onChange} />
                </span>
                <span
                    className="checkbox-label"
                    contentEditable={!readOnly}
                    suppressContentEditableWarning
                >
                    {children}
                </span>
            </div>
        );
    }
}

export { CheckListItem };
