   import axios from 'axios'
   import {CART_REMOVE_ITEM,
           CART_ADD_ITEM, 
           CART_SAVE_SHIPPING_ADDRESS,
    
           CART_SAVE_PAYMENT_METHOD} from '../constants/cartConstants'
//prende il prodotto e lo aggiunge al carrello in base all'id che riceve



export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id, //quando chiamo x.product mi rivolgo all'id
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty 
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    
}

export const removeFromCart = (id) => (dispatch, getState) => { //manda payload con id per capire cosa cancellare
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id,
    })
    //questo comando parte dopo il dispatch della ACTION e del REDUCER
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data,
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data)) //passo i valori sottoforma di un file JSON
}


export const savePaymentMethod = (data) => (dispatch) => { 
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data,
    })

    localStorage.setItem('paymentMethod', JSON.stringify(data)) 
}




 