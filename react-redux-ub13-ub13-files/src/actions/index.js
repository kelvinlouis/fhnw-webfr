export const UPDATE_FILTER_TERM = 'UPDATE_FILTER_TERM';
export const LOADING_MOVIES = 'LOADING_MOVIES';
export const SET_MOVIES = 'SET_MOVIES';

export const updateFilterTerm = (term) => ({
    type: UPDATE_FILTER_TERM,
    term,
});

export const fetchMovies = () => (dispatch) => {
    dispatch(loadingMovies());
    fetch(`https://softwarelab.ch/api/public/v1/movies`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((movies) => {
            dispatch(setMovies(movies));
        })
        .catch((error) => {
            console.log(error);
        });
};
export const loadingMovies = () => ({ type: LOADING_MOVIES });
export const setMovies = (movies) => ({
    movies,
    type: SET_MOVIES
});