import React, { createContext, useContext, userContext } from 'react';
import { useProductReducer } from './reducers';


const StoreContext = createContext();
const { Provider } = StoreContext;


const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
        products: [],
        cart: [],
        categories: [],
        currentCategory: '',
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />
}

const useStoreContext = () => {
    return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };