import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../appRedux/user/userSlice';
import cartReducer from '../appRedux/cart/cartSlice';

export const store= configureStore({
    reducer:{
       user: userReducer,
       cart:cartReducer,
    }
})


export default store;