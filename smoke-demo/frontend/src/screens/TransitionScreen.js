import React , { useState, useEffect } from 'react'

import {Form, Button } from 'react-bootstrap'

import FormContainer from '../components/FormContainer'

function TransitionScreen() {

    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        let timer = setInterval(() => {
          if (opacity < 1) {
            setOpacity(opacity + 0.1);
          } else {
            clearInterval(timer);
          }
        }, 50);

        return () => clearInterval(timer); // clean up the interval when the component unmounts 
    }, [opacity]);

    
    const parent = document.getElementById('parent')
    const child = document.getElementById('child')
    child.textContent('Ciao sono un kid')
    parent.appendChild(child)

  return (
    <div style={{ opacity }} id='parent'>  

      <ChildComponent></ChildComponent>
      <p id='child'></p>
        <FormContainer>
       <h1>Sign In</h1>
       
       <Form >
          
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type='email'
              placeholder='Enter Email'
              
              
              className='my-3'
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-3' >Sign In</Button>
       </Form>

   
    </FormContainer>
    </div>  
  )
}

const ChildComponent = () => {
  return <p>Sono il componente figlio</p>;
};




export default TransitionScreen




