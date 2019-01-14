import React from 'react'
import _ from 'lodash'
import { Button } from 'reactstrap'
import QuestionnaireShowDialog from './QuestionnaireShowDialog'
import QuestionnaireUpdateDialog from './QuestionnaireUpdateDialog'

const QuestionnaireTableElement = ({ update, _delete, questionnaire }) => (
    <tr key={ questionnaire.id } >
        <td>{ questionnaire.id }</td>
        <td>{ questionnaire.title }</td>
        <td>{ questionnaire.description }</td>
        <td><QuestionnaireShowDialog questionnaire={ questionnaire } /></td>
        <td><QuestionnaireUpdateDialog update={ update } questionnaire={ questionnaire } /></td>
        <td><Button color='danger' onClick={ _.partial(_delete, questionnaire.id) } className='float-right' >Delete</Button></td>
    </tr>
)


export default QuestionnaireTableElement;