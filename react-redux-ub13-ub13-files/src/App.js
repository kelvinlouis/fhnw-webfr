import React from 'react';
import { connect } from 'react-redux';
import './css/style.css'

import Filter from './Filter'
import Movie from './Movie'
import { updateFilterTerm } from './actions';
                    
const App = ({ term, filteredMovies, isLoading, onFilterChange }) => (
    <main>
        { isLoading && <div>Loading...</div> }
        <Filter term={ term } onChange={ onFilterChange } />
        { filteredMovies.map(movie => <Movie key={ movie.rank } data={ movie } />) }
    </main>
);

const mapStateToProps = state => ({
    filteredMovies: state.filteredMovies,
    term: state.term,
    isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
    onFilterChange: (term) => {
        dispatch(updateFilterTerm(term));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
