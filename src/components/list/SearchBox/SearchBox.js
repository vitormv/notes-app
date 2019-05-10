import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './SearchBox.scss';

class SearchBox extends React.PureComponent {
    constructor(props) {
        super(props);

        this.width = 0;
        this.inputNode = null;
        this.containerNode = null;
        this.state = { isFocused: false };
    }

    componentDidMount() {
        this.recalculateContainerWidth();
    }

    componentDidUpdate() {
        this.recalculateContainerWidth();
    }

    onClickErase(event) {
        this.props.onInputChange('');
        this.toggleInputFocus(false);

        event.stopPropagation();
        event.preventDefault();
        return false;
    }

    toggleInputFocus(isFocused) {
        if (this.inputNode) {
            this.setState({ isFocused });

            if (isFocused) {
                this.inputNode.focus();
            } else {
                this.inputNode.blur();
            }
        }
    }

    recalculateContainerWidth() {
        this.width = Math.floor(this.containerNode.getBoundingClientRect().width);
    }

    render() {
        const { searchQuery, onInputChange } = this.props;
        const { isFocused } = this.state;
        const hasSearchQuery = searchQuery.length > 0;

        return (
            <div
                className={cn({
                    [styles.wrapper]: true,
                    [styles.hasFocus]: isFocused,
                    [styles.hasSearchQuery]: hasSearchQuery,
                })}
                ref={(el) => { this.containerNode = el; }}
                onClick={() => { this.toggleInputFocus(true); }}
            >
                <span
                    className={cn({
                        [styles.outerSpan]: true,
                        [styles.hasFocus]: isFocused,
                        [styles.hasSearchQuery]: hasSearchQuery,
                    })}
                >
                    <FontAwesomeIcon
                        className={cn({
                            [styles.icon]: true,
                            [styles.hasFocus]: isFocused,
                        })}
                        icon="search"
                    />
                    <span
                        className={cn({
                            [styles.label]: true,
                            [styles.hasSearchQuery]: hasSearchQuery,
                        })}
                    >
                        Search
                    </span>
                    <input
                        className={cn({
                            [styles.input]: true,
                            [styles.inputActive]: isFocused || hasSearchQuery,
                        })}
                        ref={(el) => { this.inputNode = el; }}
                        value={searchQuery}
                        width={this.width}
                        onChange={(e) => { onInputChange(e.target.value); }}
                        onClick={(e) => { e.stopPropagation(); }}
                        onBlur={() => { this.toggleInputFocus(false); }}
                        onFocus={() => { this.toggleInputFocus(true); }}
                    />
                </span>
                <FontAwesomeIcon
                    className={cn({
                        [styles.clear]: true,
                        [styles.hasFocus]: isFocused,
                        [styles.hasSearchQuery]: hasSearchQuery,
                    })}
                    icon="times-circle"
                    onClick={(e) => { this.onClickErase(e); }}
                />
            </div>
        );
    }
}

SearchBox.propTypes = {
    searchQuery: PropTypes.string,
    onInputChange: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
    searchQuery: 'Search',
};

export { SearchBox };
