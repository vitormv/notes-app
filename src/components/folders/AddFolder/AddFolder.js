import React from 'react';
import PropTypes from 'prop-types';
import { animated } from 'react-spring';
import { FolderItemLabel } from 'src/components/folders/FolderItemLabel';
import { RenameFolder } from 'src/components/folders/RenameFolder';

class AddFolder extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isInputVisible: false,
        };

        this.toggleInput = this.toggleInput.bind(this);
    }

    toggleInput(isInputVisible) {
        this.setState({ isInputVisible });
    }

    render() {
        return (
            <animated.li>
                <RenameFolder
                    resetOnHide
                    motion="verticalSlide"
                    isInputVisible={this.state.isInputVisible}
                    toggleInput={this.toggleInput}
                    renderElement={style => (
                        <FolderItemLabel
                            style={style}
                            label="add folder"
                            icon="plus"
                            onClick={() => { this.toggleInput(true); }}
                        />
                    )}
                    onEnter={(value) => { this.props.addFolderCallback(value); }}
                />
            </animated.li>
        );
    }
}

AddFolder.propTypes = {
    addFolderCallback: PropTypes.func.isRequired,
};

export { AddFolder };
