import Note from "../actions/Note";

const initialNotesState = {
    count: 0,
    noteItems: [],
    error: null,
}

const notesReducer = (initState = initialNotesState, action) => {
    console.log('action', action);
    switch (action.type) {
        //index
        case Note.GET_NOTES_REQUEST:
            return {
                ...initState,
            }
        case Note.GET_NOTES_SUCCESS:
            return {
                ...initState,
                noteItems: action.payload
            }

        case Note.GET_NOTES_ERROR:
            return {
                ...initState,
                error: action.payload
            }
        //create note
        case Note.CREATE_NOTE_REQUEST:
            return {
                ...initState,
            }
        case Note.CREATE_NOTE_SUCCESS:
            return {
                ...initState,
                noteItems: [...initState.noteItems, action.payload]
            }

        case Note.CREATE_NOTE_ERROR:
            return {
                ...initState,
            }
        default:
            console.log("getting innital state");
            return initState;
    }
}

export default notesReducer;