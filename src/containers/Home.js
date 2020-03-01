import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Home.css";
import { connect } from 'react-redux';
import { doGetNotes } from "../actions/Note";


const Home = props => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function onLoad() {
            if (!props.isAuthenticated) {
                return;
            }

            if (props.notes.length > 0) {
                return;
            }

            setIsLoading(true);
            try {
                const notes = await props.getNotes();
            } catch (e) {
                alert(e);
            }

            setIsLoading(false);
        }

        onLoad();
    }, [props.isAuthenticated]);


    function renderNotesList() {
        const { notes } = props;

        if (notes.length < 1) {
            return
        }
        return notes.map((note, i) =>
            i !== 0 ? (
                <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
                    <ListGroupItem header={note.content.trim().split("\n")[0]}>
                        {"Created: " + new Date(note.createdAt).toLocaleString()}
                    </ListGroupItem>
                </LinkContainer>
            ) : (
                    <LinkContainer key="new" to="/notes/new">
                        <ListGroupItem>
                            <h4>
                                <b>{"\uFF0B"}</b> Create a new note
              </h4>
                        </ListGroupItem>
                    </LinkContainer>
                )
        );
    }
    function renderLander() {

        return (
            <div className="lander">
                <h1>Scratch</h1>
                <p>A simple note taking app</p>
            </div>
        );
    }

    return (
        <div className="Home">
            {props.isAuthenticated ? renderNotesList() : renderLander()}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        isAuthenticated: state.auth.isLoggedIn,
        notes: state.notes.noteItems,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getNotes: x => dispatch(doGetNotes()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
