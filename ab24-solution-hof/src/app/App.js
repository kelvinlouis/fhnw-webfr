import React from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import Header from './Header';
import QuestionnaireContainer from '../questionnaire/QuestionnaireContainer';
import Footer from './Footer';
import Message from '../misc/Message';

const App = ({ error }) => {
    return (
        <Container>
            <Header title='Flashcard Client with React' subtitle='Version 2' />
            { error && <Message message={ error.message } /> }
            <QuestionnaireContainer />
            <Footer message='@ The FHNW Team' />
        </Container>
    );
};

const mapStateToProps = state => ({
    error: state.error,
});

export default connect(mapStateToProps)(App);
