import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import AnimatedPage from '../components/AnimatedPage'
import { listOrders } from '../actions/orderActions'


function OrderListScreen({ history }) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const {loading, error, orders} = orderList

    const userLogin = useSelector(state => state.userLogin)//userInfo è l'istanza di un oggetto con un valore bool isAdmin
    const { userInfo } = userLogin //destructuring

    
    useEffect(() => {
      if(userInfo && userInfo.isAdmin){
        dispatch(listOrders())
      }else{
        history.push('/login')
      }
        
    }, [dispatch, history, userInfo])

    

    // if  ()     else if ()      else ()  A?B:C?D:E
  return (
  <AnimatedPage>
    <div>
    <h1>Orders</h1>
    
    {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>)
    : (
     <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th></th>
           </tr>
        </thead>

        <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>

                <td>{order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{color : 'red'}}></i>
                )}
                </td>

                <td>{order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{color : 'red'}}></i>
                )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                        <i>Details</i>
                    </Button>
                  </LinkContainer>

                </td>
              </tr>
            ))}
        </tbody>
     </Table> 
    )}
    <Table>
      <thead>

      </thead>
      <tbody>

      </tbody>
    </Table>
    </div>
  </AnimatedPage>
  )
}


export default OrderListScreen