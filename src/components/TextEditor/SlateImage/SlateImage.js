import React from 'react';
import PropTypes from 'prop-types';
import classsNames from 'classnames';
import './SlateImage.scss';

class SlateImage extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = { src: props.src };
    }

    componentDidMount() {
        const imagePath = this.props.src;

        this.load(imagePath);
    }

    load(imagePath) {
        const reader = new FileReader();
        reader.addEventListener('load', () => this.setState({ src: reader.result }));
        reader.readAsDataURL(imagePath);
    }

    render() {
        const {
            isSelected, attributes, onRemove,
        } = this.props;

        return (
            <div
                className={classsNames({
                    'slate-image': true,
                    'slate-image--selected': isSelected,
                })}
                {...attributes}
            >
                <span className="slate-image__remove" onClick={onRemove}>
                    <i className="icon-times" />
                </span>
                <img src={this.state.src} />
            </div>
        );
    }
}

SlateImage.propTypes = {
    src: PropTypes.object.isRequired,
    isSelected: PropTypes.bool.isRequired,
    attributes: PropTypes.shape({}),
    onRemove: PropTypes.func,
};

SlateImage.defaultProps = {
    attributes: {},
    onRemove: () => {},
};

export { SlateImage };
