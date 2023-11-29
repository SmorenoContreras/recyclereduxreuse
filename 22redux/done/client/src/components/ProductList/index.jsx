import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../ProductItem';
import { updateProducts } from '../../utils/GlobalState';
import { useLazyQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const dispatch = useDispatch();
  const currentCategory = useSelector((state) => state.currentCategory);
  const products = useSelector((state) => state.products);

  const [getProducts, { loading, data }] = useLazyQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (!products.length) {
      getProducts();
    } else {
      idbPromise('products', 'put', products);
    }
  }, [products, getProducts]);

  useEffect(() => {
    if (data) {
      dispatch(updateProducts(data.products));
      idbPromise('products', 'put', data.products);
    }
  }, [data, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return products;
    }
    return products.filter((product) => product.category._id === currentCategory);
  }

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
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
        <h3>You havent added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
