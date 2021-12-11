import React, { createContext, useContext, userContext } from 'react';
import { useProductReducer } from './reducers';


const StoreContext = createContext();
const { Provider } = StoreContext;


const StoreProvider = ({ value = [], ...props }) => {
    cosnt [state, dispatch] = useProductReducer({
        products: [],
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