import React from 'react';
import { Alert } from 'reactstrap'

const Message = ({ message }) => 
    <Alert color='danger'>
        { message }
    </Alert>

export default Message;