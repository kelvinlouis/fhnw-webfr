import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../misc/Loader';
import QuestionnaireTable from './QuestionnaireTable';
import QuestionnaireCreateDialog from './QuestionnaireCreateDialog';
import {
    fetchQuestionnaires,
    requestCreateQuestionnaire,
    requestDeleteQuestionnaire,
    requestUpdateQuestionnaire
} from '../actions';

class QuestionnaireContainer extends Component {
    componentDidMount() {
        const { onRendered } = this.props;
        onRendered();
    }

    render() {
        const { props } = this;

        return (
            <div>
                <QuestionnaireCreateDialog create={props.onCreate} />
                <h3>Questionnaires</h3>
                { props.isLoading ?
                    <Loader />
                    :
                    <QuestionnaireTable update={props.onUpdate} _delete={props.onDelete} qs={props.questionnaires} />
                }
            </div>
        );
    }
};

const mapStateToProps = state => ({
    isLoading: state.isLoading,
    questionnaires: state.questionnaires,
});

const mapDispatchToProps = dispatch => ({
    onCreate: (title, description) => {
        dispatch(requestCreateQuestionnaire(title, description));
    },

    onUpdate: (questionnaire) => {
        dispatch(requestUpdateQuestionnaire(questionnaire));
    },

    onDelete: (id) => {
        dispatch(requestDeleteQuestionnaire(id));
    },

    onRendered: () => {
        dispatch(fetchQuestionnaires());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionnaireContainer);