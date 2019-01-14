import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Col, Input } from 'reactstrap';

class QuestionnaireCreateDialog extends Component {

    constructor(props) {
        super(props)
        this.state = { title: '', description: '', showModal: false }
    }
    
    open = () =>  {
        this.setState({ showModal: true })
    }

    close = () => {
        this.setState({ title: '', description: '', showModal: false })
    }

    onChange = event => {
        // [event.target.name]: Computed property names, siehe https://mzl.la/1GIMi82
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        event.preventDefault()
        this.props.create(this.state.title, this.state.description)
        this.setState({ title: '', description: '', showModal: false })
    }

    render() {
        return (
          <div>
            <Button color="success" onClick={this.open} className='float-right'>Add Questionnaire</Button>
            <Modal isOpen={this.state.showModal} toggle={this.close} size="lg" 
                        autoFocus={false}>
              <ModalHeader toggle={this.close} >
                Create Questionnaire
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

export default QuestionnaireCreateDialog
