import React from 'react';
import styles from './products.css';
// import { connect } from 'umi';
import ProductList from '@/components/ProductList';
import { Dispatch,connect } from 'dva';

// 这里要注意下，connect到底是dva的还是umi的，要不要带 @tiype，暂时显卡告一段落

interface ProductsProp {
  dispatch: Dispatch;
  products: Array<object>;
}

const Products = (props: ProductsProp) => {
  const { dispatch, products } = props;
  function handleDelete(id: number) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }

  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default () => {
//   return (
//     <div>
//       <h1 className={styles.title}>Page products</h1>
//     </div>
//   );
// }

export default Products;
// export default connect(({ products }: { products: Array<object> }) => ({
//   products,
// }))(Products);
