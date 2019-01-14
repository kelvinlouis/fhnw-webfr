import React from 'react';
import loader from './loader.gif'
import './loader.css'

const Loader = () =>
    <section className='container'>
        <img alt='Loading...' src={ loader } />
    </section>

export default Loader;