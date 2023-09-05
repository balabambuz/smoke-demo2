import {CART_REMOVE_ITEM,
        CART_ADD_ITEM, 
        CART_SAVE_SHIPPING_ADDRESS,
        
        CART_SAVE_PAYMENT_METHOD,
    
        CART_CLEAR_ITEMS} from '../constants/cartConstants'


export const cartReducer = (state = { cartItems: [], shippingAddress:{} }, action) => {
   switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)//oggetto uguale a oggetto payload
            if(existItem){ //se l'oggetto esiste gia
                return{
                    ...state, 
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x)//ritorna il prodotto aggiornato del payload altrimenti ritorna l'oggetto 
                }                                                   //originale invariato
            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems, item] //ritorna l'elenco originale di  prodotti piu il nuovo prodotto aggiunto
                }      
            }

        case CART_REMOVE_ITEM:
            console.log('pera2')
            return{
                ...state,
                cartItems:state.cartItems.filter(x => x.product !== action.payload)
            }
            

            
        
        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress:action.payload
            }


        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod:action.payload
            }

        case CART_CLEAR_ITEMS:
            return {
                ...state,
                cartItems:[]
            }

        default:
            return state
   } 
}