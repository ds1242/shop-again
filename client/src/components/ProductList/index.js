import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from "../../utils/helpers";
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const [state, dispatch] = useStoreContext();
  
  const { currentCategory } = state;
  
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // if there's data to be stored
    if (data) {
      // store in global state
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
      // tak each product and store it to indexDB using the helper function
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
      // add else if to check if `lodaing` is undefined in `useQuery()` hook
    } else if (!loading) {
      // since we're offline, get all of the data from the `products` store
      idbPromise('products', 'get').then((products) => {
        // use retrieved data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }
    return state.products.filter(product => product.category._id === currentCategory);    
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
