import {createStore, combineReducers, applyMiddleware } from 'redux' //prende tutti i reducers e li combina in un unico reducer
import thunk from 'redux-thunk'                                      // thunk chiama action creators che ritornano una funzione invece di un action object  
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    productListReducer, 
    productDetailsReducer, 
    productDeleteReducer, 
    productCreateReducer, 
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer, } from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'

import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailReducer, 
    userUpdateProfileReducer, 
    userListReducer, 
    userUpdateReducer,
    userDeleteReducer } from './reducers/userReducers'

import { 
    orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListMyReducer, 
    orderListReducer, 
    orderDeliverReducer} from './reducers/orderReducers'


import {
postListReducer, 
workListReducer
} from './reducers/mediaReducers'

const reducer = combineReducers({
     productList: productListReducer,
     productDetails: productDetailsReducer,
     productDelete: productDeleteReducer,
     productCreate: productCreateReducer,
     productUpdate: productUpdateReducer,
     productReviewCreate: productReviewCreateReducer,
     productTopRated: productTopRatedReducer,
     
     cart: cartReducer,
     userLogin: userLoginReducer,
     userRegister: userRegisterReducer,
     userDetails: userDetailReducer,
     userUpdateProfile: userUpdateProfileReducer,
     userList: userListReducer,
     userDelete: userDeleteReducer,
     userUpdate: userUpdateReducer,

     orderCreate: orderCreateReducer,
     orderDetails: orderDetailsReducer,
     orderPay: orderPayReducer,
     orderListMy: orderListMyReducer,
     orderList: orderListReducer,
     orderDeliver: orderDeliverReducer,

     postList: postListReducer,
     workList: workListReducer
     
     

     

}) //reducer uguale alla combinazione di reducers
//all'avvio dell'app vengono creati in redux contenitori vuoti dei reducers




const cartItemsFromStorage = localStorage.getItem('cartItems') ?
    JSON.parse(localStorage.getItem('cartItems')) : [] //se esiste lo prendiamo e lo trasformiamo in JSON altrimenti passiamo un array vuoto

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null 

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {} //se localstorage è vuoto ALLORA {}



const initialState = {//lo state iniziale che poi viene aggiornato dai reducer è composto da KEY-VALUE con un JSON a secondo valore
    cart: { 
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    }, //se era stata già aperta una sessione allora lo state verrà caricato con gli oggetti salvati nel carrello 

    userLogin: { userInfo: userInfoFromStorage} // della sessione precedente
}



const middleware = [thunk] //passo come array di middleware per aggiungerne di più in una volta

const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware))) // ... spread operator



export default store

//MODUS OPERANDI

//BACKEND
//views, url

//FRONTEND
//costants, reducers(&store.js), actions
//screens