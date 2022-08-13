import styles from './ProductImages.module.css'
import Slider from 'react-slick'
const ProductImages = ({ product }) => {
  const settings = {
    className: styles.slider,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    customPaging: function (i) {
      return (
        <img src={product.imgs[i].src} alt="" className={styles.carrousel} />
      );
    },
    appendDots: dots => <ul>{dots}</ul>,
    dotsClass: `slick-dots slick-thumb ${styles.slick_dots}`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dotsClass: 'slick-dots slick-thumb',
          customPaging: i => <button>{i + 1}</button>,
          appendDots: dots => <ul>{dots}</ul>,
        }
      }
    ]
  }
  return (
    <Slider {...settings} >
      {product.imgs.map((img) => (
        <picture key={img.id} className={styles.slider_item}>
          <img src={img.src} alt="" />
        </picture>
      ))}
    </Slider>
  )
}

export default ProductImages