import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import SearchBox from './SearchBox'
import { logout } from '../actions/userActions'
function Header() {

  const userLogin = useSelector(state => state.userLogin) //prende le informazioni dell'utente dallo store
  const { userInfo } = userLogin

  const cart = useSelector(state=> state.cart)

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
            <img
          src="../images/spacesmoke.png"
          width="80"
          height="80"
          className="d-inline-block align-top"
          alt="Logo"
        />
         </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <SearchBox/> 
            
            <Nav className="mr-auto">

            <LinkContainer to='/home'>
                <Nav.Link><i className="fa-solid fa-house px-1"></i>Home</Nav.Link>
            </LinkContainer>
      
            <LinkContainer to='/shop'>
                <Nav.Link><i className="fa-solid fa-bag-shopping px-1"></i>Shop</Nav.Link>
              </LinkContainer>

              <LinkContainer to='/cart'>
                <Nav.Link>{ cart.cartItems.length > 0 && <i className="circle"></i>}<i className="fas fa-shopping-cart px-1"></i>Cart</Nav.Link>
              </LinkContainer>

            
              <LinkContainer to='/about_me'>
                <Nav.Link><i className="fa-solid fa-briefcase px-1"></i>About_me</Nav.Link>
              </LinkContainer>

            {/* <NavDropdown title={<span><i className="fa-solid fa-briefcase px-1"></i>Portfolio</span>} id='username'>
                  <LinkContainer to='/works'>
                    <NavDropdown.Item>Works</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/videos'>
                    <NavDropdown.Item>Videos</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/aboutme'>
                    <NavDropdown.Item>About me</NavDropdown.Item>
                  </LinkContainer>
                 

                </NavDropdown> */}
            

              {userInfo ? (
                <NavDropdown title={<span><i className="fa-solid fa-user px-1"></i>{userInfo.name}</span>} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                </NavDropdown>
            ) : (
                <LinkContainer to='/login'>
                  <Nav.Link><i className="fas fa-sign-in"></i>Login</Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                   <NavDropdown title='Admin' id='adminmenu '>

                      <LinkContainer to='/admin/userlist'>
                         <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/productlist'>
                         <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/orderlist'>
                         <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
 
                 </NavDropdown>   
              )}
            </Nav>
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>

  )
}

export default Header