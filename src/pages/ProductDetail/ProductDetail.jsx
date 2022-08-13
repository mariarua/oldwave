import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { formatPrice } from "../../utils/numbers";

import ProductImages from '../../components/ProductImages/ProductImages';

import styles from './ProductDetail.module.css'

const ProductDetail = () => {


  //const img_product = product.img.map(img => img.src) //[src,src,src]

  const [product, setProduct] = useState()

  const { id } = useParams();

  useEffect(() => {
    fetch("https://oldwave-backend.herokuapp.com/api/product/" + id)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data[0]);
        console.log(data);
      });
  }, [id]);

  return (

    product && (
      <div className={styles.container} >
        <section className={styles.section}>
          {product.imgs && <ProductImages product={product} />}
        </section>
        <section className={styles.product_detail}>
          <small className={styles.product_detail_able}>Disponible</small>
          <h1 className={styles.product_detail_title}>{product.name} {product.brand}</h1>
          <span className={styles.product_detail_description}> {product.description}</span>
          <span className={styles.product_detail_price}>{formatPrice(product.price)}</span>
          <span>{product.city}</span>

          <div className={styles.product_reseller}>
            <picture className={styles.product_reseller_logo}>
              <img src={product.reseller_logo} alt="Reseller Logo" />
            </picture>
            <span className={styles.product_reseller_name}>{product.reseller}</span>
            <span className={styles.produc_reseller_rating}> {product.reseller_rating} ⭐</span>
          </div>

        </section>
      </div >
    )
  )
}

export default ProductDetail