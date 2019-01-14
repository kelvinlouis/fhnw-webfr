export const SET_QUESTIONNAIRES = 'SET_QUESTIONNAIRES';
export const START_LOADING = 'START_LOADING';
export const STOP_LOADING = 'STOP_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const UPDATE_QUESTIONNAIRE = 'UPDATE_QUESTIONNAIRE';
export const ADD_QUESTIONNAIRE = 'ADD_QUESTIONNAIRE';
export const DELETE_QUESTIONNAIRE = 'DELETE_QUESTIONNAIRE';

const loadingQuestionnaires = () => ({ type: START_LOADING });
const stopLoadingQuestionnaires = () => ({ type: STOP_LOADING });

const SERVER_URL = `http://localhost:9090/flashcard-express/questionnaires`;

const deleteQuestionnaire = (id) => ({
    id,
    type: DELETE_QUESTIONNAIRE
});

const updateQuestionnaire = (questionnaire) => ({
    questionnaire,
    type: UPDATE_QUESTIONNAIRE,
});

const addQuestionnaire = (questionnaire) => ({
    questionnaire,
    type: ADD_QUESTIONNAIRE,
});

const setQuestionnaires = (questionnaires) => ({
    questionnaires,
    type: SET_QUESTIONNAIRES,
});

const setError = (message) => ({
    type: SET_ERROR,
    message,
});

const ajax = (dispatch) => (url, request) => {
    dispatch(loadingQuestionnaires());

    return fetch(url, request)
        .then(response => {
            if (response.ok) {
                dispatch(stopLoadingQuestionnaires());
                return response.status !== 204 ? response.json() : null
            }

            throw new Error(response.error ? response.error : 'Network response was not ok.')
        })
        .catch(error => {
            dispatch(stopLoadingQuestionnaires());
            dispatch(setError(error.message));
            console.error(error);
        })
};

export const fetchQuestionnaires = () => (dispatch) => {
    ajax(dispatch)(`${SERVER_URL}`)
        .then((questionnaires) => {
            dispatch(setQuestionnaires(questionnaires));
        });
};

export const requestDeleteQuestionnaire = (id) => (dispatch) => {
    const request = { method: 'DELETE' };

    ajax(dispatch)(`${SERVER_URL}/${id}`, request)
        .then(() => {
            dispatch(deleteQuestionnaire(id));
        });
};

export const requestUpdateQuestionnaire = (questionnaire) => (dispatch) => {
    const request = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(questionnaire),
    };

    ajax(dispatch)(`${SERVER_URL}/${questionnaire.id}`, request)
        .then(() => {
            dispatch(updateQuestionnaire(questionnaire));
        });
};

export const requestCreateQuestionnaire = (title, description) => (dispatch) => {
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({ title: title, description: description })
    };

    ajax(dispatch)(`${SERVER_URL}`, request)
        .then((questionnaire) => {
            dispatch(addQuestionnaire(questionnaire));
        });
};