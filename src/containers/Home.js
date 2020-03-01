import React, { useEffect } from "react";
import { ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Home.css";
import { connect } from "react-redux";
import { doGetNotes } from "../actions/Note";

const Home = props => {
  console.log("props", props);
  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      if (props.notes.length > 0) {
        return;
      }

      try {
        await props.getNotes();
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.notes]);

  function renderNotesList() {
    const { notes } = props;

    if (notes.length < 1) {
      return;
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
      {props.isLoading ? (
        <LoaderButton block bsSize="large" isLoading={props.isLoading}>
          loading...
        </LoaderButton>
      ) : (
        ""
      )}
      {props.isAuthenticated ? renderNotesList() : renderLander()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isLoggedIn,
    notes: state.notes.noteItems,
    isLoading: state.notes.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNotes: x => dispatch(doGetNotes())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
