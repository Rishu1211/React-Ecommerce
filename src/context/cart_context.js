
import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import  reducer from "../reducer/cartReducer"
import { useEffect } from "react";


const CartContext = createContext();

const getLocalCartData = () => {
    let localCartData = localStorage.getItem("thapaCart");

    const parseData = JSON.parse(localCartData);
    if(!Array.isArray(parseData)) return [];
    return parseData;
    // if (localCartData== [])  {
    //   return [];
    // } else {
    //   return JSON.parse(localCartData);
    // }
  };
const initialState = {
   // cart : [],
   cart : getLocalCartData(),
    total_item : "",
    total_price :"",
    shipping_fee : 50000,
}


const CartProvider = ({children}) => {

   
    const [state , dispatch] = useReducer(reducer , initialState)

    const addToCart = (id , color , amount , product) => {
        dispatch({type : "ADD_TO_CART" , payload: {id , color , amount , product} })
    }

    // increment and decrement
    const setDecrease = (id) => {
        dispatch({type:"SET_DECREMENT" , payload : id})
    };

    const setIncrease = (id) => {
        dispatch({type:"SET_INCREMENT" , payload : id})
    }


// to remove the individual item from cart
    const removeItem = (id) =>{
        dispatch({type:"REMOVE_ITEM" , payload:id})
    }

//to clear the cart
const clearCart =() =>{
    dispatch({type:"CLEAR_CART"})
}
    

    //to add the data in localstorage
    useEffect (() =>{
        // dispatch({type:"CART_TOTAL_ITEM"})
        // dispatch({type:"CART_TOTAL_PRICE"});
        dispatch({type:"CART_ITEM_PRICE_TOTAL"})

        localStorage.setItem("thapaCart" , JSON.stringify(state.cart))
    },[state.cart])

    return <CartContext.Provider 
      value={{ 
        ...state ,
        addToCart ,
        removeItem , 
        clearCart,
        setDecrease,
        setIncrease,
        }} > 
        {children} 
        </CartContext.Provider>
}

const useCartContext = () => {
    return useContext(CartContext);
}

export {CartProvider , useCartContext }