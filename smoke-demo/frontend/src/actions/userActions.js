import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    //USER_UPDATE_PROFILE_RESET,

} from '../constants/userConstants'
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

export const login = (email, password) => async (dispatch) => {//prende gli argomenti e li passa al backend 

    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = { //variabile di configurazione della richiesta POST
            headers: {
                'ContentType' : 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/login/',                //li manda all'url del login-in come oggetto 
            {'username': email, 'password': password} ,config )
        
        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })

    }
}

  
export const logout = () => (dispatch) => {//spedisco direttamente le costanti ai reducers senza passare delle actions che sono degli agglomerati di costants
    localStorage.removeItem('userInfo')
    dispatch({type: USER_LOGOUT})
    dispatch({type: USER_DETAILS_RESET}) //pulisco USER_DETAILS in modo da non trovarlo pieno con le utenze vecchie nel 
    dispatch({type: ORDER_LIST_MY_RESET})
    dispatch({type: USER_LIST_RESET})
    dispatch({type: CART_CLEAR_ITEMS})
}



export const register = (name, email, password) => async (dispatch) => {//prende gli argomenti e li passa al backend 

    try{//leggo dall'alto verso il basso
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = { //variabile di configurazione della richiesta POST
            headers: {
                'ContentType' : 'application/json'
            }
        }

        const {data} = await axios.post(
            '/api/users/register/',                //li manda all'url del login-in come oggetto 
            {'name':name, 'email': email, 'password': password} ,config )
        
        dispatch({
            type:USER_REGISTER_SUCCESS,
            payload:data
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }catch(error){
        
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })

    }
}




export const getUserDetails = (id) => async (dispatch, getState) => {//prendo l'id per ottenere un utente specifico

    try{
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo }, //vado dentro a redux e prendo il token di accesso da userInfo
        } = getState()

        const config = { 
            headers: {
                'ContentType' : 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(
            `/api/users/${id}/`,   //id = profile             
             config )
        
        dispatch({
            type:USER_DETAILS_SUCCESS,
            payload:data
        })

    
    }catch(error){
        
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })

    }
}




export const updateUserProfile = (user) => async (dispatch, getState) => {//prendo l'id per ottenere un utente specifico

    try{
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {
            userLogin: { userInfo }, //vado dentro a redux e prendo il token di accesso da userInfo
        } = getState()

        const config = { 
            headers: {
                'ContentType' : 'application/json',
                Authorization: `Bearer ${userInfo.token}` //il token serve per passare "isAuthenticated"  
            }                                            
        }                                                 //dall'authToken capisce anche su quale utente attuare le modifiche 

        const {data} = await axios.put(
            `/api/users/profile/update/`, 
             user,               
             config )
        
        dispatch({
            type:USER_UPDATE_PROFILE_SUCCESS,
            payload:data
        })

        dispatch({
            type:USER_LOGIN_SUCCESS,
            payload:data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    
    }catch(error){
        
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })

    }
}



export const listUsers = () => async (dispatch, getState) => {

    try{
        dispatch({
            type: USER_LIST_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = { 
            headers: {
                'ContentType' : 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }                                            
        }                                                 

        const {data} = await axios.get( //recupero i dati dall backend e li impacchetto
            `/api/users/`,                
             config )
        
        dispatch({
            type:USER_LIST_SUCCESS,
            payload:data
        })
    
    }catch(error){
        
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })

    }
}



export const deleteUser = (id) => async (dispatch, getState) => {

    try{
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = { 
            headers: {
                'ContentType' : 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }                                            
        }                                                 

        const {data} = await axios.delete( 
            `/api/users/delete/${id}/`,                
             config )
        dispatch({
            type:USER_DELETE_SUCCESS,
            payload:data//messaggio della Response di Django
        })
    
    }catch(error){
        
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })

    }
}


export const updateUser = (user) => async (dispatch, getState) => {

    try{
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const {
            userLogin: { userInfo }
        } = getState()

        const config = { 
            headers: {
                'ContentType' : 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }                                            
        }                                                 

        const {data} = await axios.put( 
            `/api/users/update/${user._id}/`,                
             user, 
             config )
        
        dispatch({
            type:USER_UPDATE_SUCCESS,
        })

        dispatch ({
            type:USER_DETAILS_SUCCESS,
            payload: data
        })
    
    }catch(error){
        
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail 
            ? error.response.data.detail
            : error.message
        })

    }
}



