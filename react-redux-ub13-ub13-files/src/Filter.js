import React from 'react'

const Filter = ({ onChange, term }) => {
    const onInputChange = (event) => {
        event.preventDefault();
        onChange(event.target.value);
    };

    return (
        <form>
            <input type='text' placeholder='Liste Filtern mit...' value={ term } onChange={ onInputChange } />
        </form>
    );
};


export default Filter