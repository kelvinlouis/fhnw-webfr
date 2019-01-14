import { LOADING_MOVIES, SET_MOVIES, UPDATE_FILTER_TERM } from '../actions';
import _ from 'lodash';

const initialMovies = [];

const initialState = {
    term: '',
    filteredMovies: [...initialMovies],
    movies: [...initialMovies],
    isLoading: false,
};

const filterMovies = (movies, term) => {
    let filterTerm = '^(?=.*' + _.trim(term).split(/\s+/).join(')(?=.*') + ').*$';
    let pattern = RegExp(filterTerm, 'i');

    return _.filter(movies, movie =>
        pattern.test(_.join([movie.year, movie.director, movie.title], ' ')));
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_MOVIES:
            return {
                ...state,
                isLoading: true,
            };
        case SET_MOVIES:
            return {
                ...state,
                isLoading: false,
                movies: action.movies,
                filteredMovies: filterMovies(action.movies, state.term),
            };
        case UPDATE_FILTER_TERM:
            return {
                ...state,
                term: action.term,
                filteredMovies: filterMovies(state.movies, action.term),
            };

        default:
            return state;
    }
};

export default reducer;