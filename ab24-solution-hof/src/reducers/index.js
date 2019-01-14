import {
    ADD_QUESTIONNAIRE,
    DELETE_QUESTIONNAIRE,
    SET_QUESTIONNAIRES,
    START_LOADING,
    STOP_LOADING,
    SET_ERROR,
    UPDATE_QUESTIONNAIRE,
} from '../actions';

const initialState = {
    questionnaires: [],
    isLoading: false,
    error: null,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };
        case STOP_LOADING:
            return { ...state, isLoading: false, error: null };
        case SET_ERROR:
            return { ...state, error: { message: action.message } };
        case SET_QUESTIONNAIRES:
            return { ...state, questionnaires: [...action.questionnaires ]};
        case ADD_QUESTIONNAIRE:
            return { ...state, questionnaires: [...state.questionnaires, action.questionnaire ]};
        case UPDATE_QUESTIONNAIRE:
            const updatedQuestionnaire = action.questionnaire;
            return { ...state, questionnaires: state.questionnaires.map((q) => q.id === updatedQuestionnaire.id ? updatedQuestionnaire : q) };
        case DELETE_QUESTIONNAIRE:
            const deletedId = action.id;
            return { ...state, questionnaires: state.questionnaires.filter(q => q.id !== deletedId) };
        default:
            return state;
    }
};

export default reducer;