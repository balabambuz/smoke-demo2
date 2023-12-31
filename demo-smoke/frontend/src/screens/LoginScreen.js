import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import AnimatedPage from '../components/AnimatedPage'

function LoginScreen({location, history}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')        //useState per tenere i valori 

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split('=')[1] : '/' //cerca una query string e ne prende il secondo value
    

    const userLogin = useSelector(state => state.userLogin) //accede a userLogin e ne prende il valore   
    const {error, loading, userInfo} = userLogin



    useEffect(() => {      //Se ho già delle credenziali e sono gia loggato
      if (userInfo) {
        history.push(redirect) //vengo reindirizzato immediatamente nel URL "/"
      }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
       e.preventDefault()
       dispatch(login(email, password))
       /* console.log(email, password, dispatch)
       console.log(typeof email, typeof password) */
    } 
    
  return (
   <AnimatedPage>
    <FormContainer>
       <h1>Sign In</h1>
       {error && <Message variant='danger'>{error}</Message>}
       {loading && <Loader />}
       <Form onSubmit={submitHandler}>
          
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control 
              type='email'
              placeholder='Enter Email'
              value ={email}
              onChange={(e) => setEmail(e.target.value)} //ogni volta che il valore cambia, cambia anche il valore dell'useState 
              className='my-3'
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value ={password}
              onChange={(e) => setPassword(e.target.value)} //ogni volta che il valore cambia, cambia anche il valore dell'useState 
              className='my-3'
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-3' >Sign In</Button>
       </Form>

    <Row className='py-3'> 
      <Col>
      New Customer? <Link
        to={redirect ? `/register?redirect=${redirect}` : '/register' }>Register
      </Link>
      </Col>
    </Row>
    </FormContainer>
  </AnimatedPage>
  )
}

export default LoginScreen