import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./Notes.css";
import { doCreateNote } from "../actions/Note";
import { connect } from 'react-redux';

const NewNote = (props) => {
    console.log(props);
    const file = useRef(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return content.length > 0;
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
                1000000} MB.`
            );
            return;
        }
        setIsLoading(true);
        console.log(await props.doCreateNote({ 'content': content, 'file': file }));
        setIsLoading(true);

    }

    return (
        <div className="NewNote">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="content">
                    <FormControl
                        value={content}
                        componentClass="textarea"
                        onChange={e => setContent(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="file">
                    <ControlLabel>Attachment</ControlLabel>
                    <FormControl onChange={handleFileChange} type="file" />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    bsStyle="primary"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Create
        </LoaderButton>
            </form>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        doCreateNote: payload => dispatch(doCreateNote(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewNote);