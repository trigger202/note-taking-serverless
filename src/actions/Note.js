import { API } from "aws-amplify";

const Note = {

    GET_NOTES_REQUEST: "GET_NOTES_REQUEST",
    GET_NOTES_SUCCESS: "GET_NOTES_SUCCESS",
    GET_NOTES_ERROR: "GET_NOTES_ERROR",

    //CREATE NOTE
    CREATE_NOTE_REQUEST: "CREATE_NOTE_REQUEST",
    CREATE_NOTE_SUCCESS: "CREATE_NOTE_SUCCESS",
    CREATE_NOTE_ERROR: "CREATE_NOTE_ERROR",


    UPDATE_NOTE_REQUEST: "UPDATE_NOTE_REQUEST",
    UPDATE_NOTE_SUCCESS: "UPDATE_NOTE_SUCCESS",
    UPDATE_NOTE_ERROR: "UPDATE_NOTE_ERROR",
}

export default Note;

const createNote = (payload) => {
    return {
        type: Note.CREATE_NOTE_REQUEST,
        payload: payload,
    }
}

const createNoteError = payload => {
    return {
        type: Note.CREATE_NOTE_ERROR,
        payload: payload,
    }
}

const createNoteSuccess = payload => {
    return {
        type: Note.CREATE_NOTE_SUCCESS,
        payload: payload,
    }
}

export const doCreateNote = payload => {
    return dispatch => {
        dispatch(createNote());
        API.post("notes", "/notes",
            {
                body: payload,
            })
            .then(res => {
                return dispatch(createNoteSuccess(payload));
            })
            .catch(err => {
                return dispatch(createNoteError(err));
            })
    }
}


const getNotesRequest = () => {
    return {
        type: Note.GET_NOTES_REQUEST,
    }
}

const getNotesRequestSuccess = (payload) => {
    return {
        type: Note.GET_NOTES_SUCCESS,
        payload: payload
    }
}

const getNotesRequestError = (payload) => {
    return {
        type: Note.GET_NOTES_ERROR,
        payload: payload
    }
}

//INDEX
export const doGetNotes = () => {

    return dispatch => {
        dispatch(getNotesRequest());
        API.get("notes", "/notes")
            .then(res => {
                console.log('get notes', res)
                return dispatch(getNotesRequestSuccess(res));
            })
            .catch(err => {
                return dispatch(getNotesRequestError(err));
            })

    }
}

