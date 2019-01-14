import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap'

class QuestionnaireUpdateDialog extends Component {

    constructor(props) {
        super(props)
        this.state = { title: this.props.questionnaire.title,
                       description: this.props.questionnaire.description, 
                       showModal: false }
    }
    
    open = () =>  {
        this.setState({ title: this.props.questionnaire.title, 
                        description: this.props.questionnaire.description, 
                        showModal: true })
    }

    close = () => {
        this.setState({ title: '', 
                        description: '', 
                        showModal: false })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()
        this.setState({ showModal: false })
        this.props.update({ id: this.props.questionnaire.id, 
                            title: this.state.title, 
                            description: this.state.description,  })
    }

    render() {
        return (
          <div>
            <Button color="primary" onClick={this.open} className='float-right' >Edit</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                Edit Questionnaire
              </ModalHeader>
              <ModalBody>
                 <Form>
                   <FormGroup row>
                     <Label md={2} for="formTitle">
                       Title
                     </Label>
                     <Col md={10}>
                       <Input type="text" name="title" value={ this.state.title } id="formTitle" onChange={ this.onChange } />
                     </Col>
                   </FormGroup>
    
                   <FormGroup row>
                     <Label md={2} for="formDescription">
                       Description
                     </Label>
                     <Col md={10}>
                       <Input type="text" name="description" value={ this.state.description } id="formDescription" onChange={ this.onChange } />
                     </Col>
                   </FormGroup>
    
                   <FormGroup>
                     <Col className="clearfix" style={{ padding: '.2rem' }}>
                       <Button className="float-right" color="secondary" onClick={this.onSubmit}>Save</Button>
                     </Col>
                   </FormGroup>
                 </Form>
              </ModalBody>
            </Modal>
          </div>
        )
      }    
}

export default QuestionnaireUpdateDialog
