import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message  from '../components/Message'
import { LinkContainer } from 'react-router-bootstrap'
import {addToCart, removeFromCart} from '../actions/cartActions'
import AnimatedPage from '../components/AnimatedPage'


function CartScreen({ match, location, history }) {
  const productId = match.params.id //cattura l'ID dall'URL
  const qty = location.search ? Number(location.search.split('=')[1]): 1 //prende il valore di qty dall'URL
                                                                          //[1] Number colpishe solo il secondo indice quindi 1 altrimenti avrebbe dato errore Nan
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin) 
    const { userInfo } = userLogin 

  const cart = useSelector(state=> state.cart)
  
  const pushLogin = () => {
    history.push("/register")
  } 
  const { cartItems } = cart

  /* console.log('cartItems:', cartItems) */


  useEffect(() =>{
    if (!userInfo) {
      history.push("/login")}
    if(productId){
      //con dispatch mando le azioni al reducer
        dispatch(addToCart(productId,qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id)) 
    
  }

  const checkoutHandler = () =>{
    history.push('/login')
  }

  return (
  <AnimatedPage>
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message variant='info'>Your cart is empty <Link to='/'>Go back</Link></Message>
            ) : (
              <ListGroup variant='flush'>
                  {cartItems.map(item => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                          <Col md={2}>
                            <Image src={item.image} alt={item.name} fluid rounded></Image>
                          </Col>

                          <Col md={3}>
                            <Link to={`/product/${item.product}`} >{item.name}</Link>
                          </Col>

                          <Col md={2}>
                            ${item.price}
                          </Col>

                          <Col md={3}>
                            <Form.Control
                                  as="select"
                                  value={item.qty}
                                  onChange={(e) => dispatch(addToCart(item.product, parseInt(e.target.value)), history.push('/cart'))}
                                  >
                                    {
                                        [...Array(item.countInStock).keys()].map((x) => ( //keys ritorna un array con le pk degli oggetti es. [0,1,2]
                                         
                                         <option key={x + 1} value={x + 1}>
                                            {x + 1}
                                         </option>

                        
                                        ))//mappo una serie di tag options in cui è un numero dell'array di countInStock generato con keys()
                                    }
                              </Form.Control>
                          </Col>

                          <Col md={1}>
                            <Button type='button' 
                            variant='light'
                            onClick={() => removeFromCartHandler(item.product, history.push('/cart'))}> 
                                <i className='fas fa-trash'></i>
                            </Button>
                          </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            ) }
        </Col>

        
        
        <Col md={4} className="py-5">
            <Card>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>  {/* 0 è il valore di partenza di acc */}
                      ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </ListGroup.Item>

                  <ListGroup.Item>
                  <LinkContainer to='/shipping'>
                    <Button
                      type='button'
                      className='btn-block'
                      disabled={cartItems == 0}
                    >
                      Proceed To Checkout 
                    </Button>
                    </LinkContainer>
                  </ListGroup.Item>
              </ListGroup>

            </Card>
        </Col>
    </Row>
    </AnimatedPage>
  )
}

export default CartScreen