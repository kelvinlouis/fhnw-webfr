import React from 'react'
import { Table } from 'reactstrap'
import QuestionnaireTableElement from './QuestionnaireTableElement'

const QuestionnaireTable = ({ update, _delete, qs }) => <section>
    <Table>
        <tbody>
        { 
            qs.map(questionnaire => 
                <QuestionnaireTableElement key={ questionnaire.id } 
                                           update={ update }
                                           _delete={ _delete }
                                           questionnaire={ questionnaire } />) 
        }
        </tbody>
    </Table>
</section>


export default QuestionnaireTable;