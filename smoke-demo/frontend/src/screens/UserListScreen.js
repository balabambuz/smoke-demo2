import React, {useEffect} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Table } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listUsers, deleteUser } from '../actions/userActions'

function UserListScreen({ history }) {

    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state => state.userLogin)//userInfo è l'istanza di un oggetto con un valore bool isAdmin
    const { userInfo } = userLogin //destructuring

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete//serve ad aggiornare l'elenco di users


    useEffect(() => {
      if(userInfo && userInfo.isAdmin){
        dispatch(listUsers())
      }else{
        history.push('/login')
      }
        
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = (id) => {
      
      if (window.confirm('are you sure you want to delete this user?')) {
        dispatch(deleteUser(id))
      }
       
    }


    // if  ()     else if ()      else ()  A?B:C?D:E
  return (
    <div>
    <h1>Users</h1>
    
    {loading ? (<Loader/>) : error ? (<Message variant='danger'>{error}</Message>)
    : (
     <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADMIN</th>
            <th></th>
           </tr>
        </thead>

        <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? (
                  <i className='fas fa-check' style={{color : 'green'}}></i>
                ) : (
                  <i className='fas fa-times' style={{color : 'red'}}></i>
                )}</td>

                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>

                  <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>

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
  )
}


export default UserListScreen