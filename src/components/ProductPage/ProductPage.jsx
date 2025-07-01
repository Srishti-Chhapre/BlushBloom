import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../ProductDetails/ProductDetails";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}api/flowers.json`)
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.products.find((item) => item.id === parseInt(id));
        setProduct(foundProduct);
      });
  }, [id]);

  if (!product) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <ProductDetails
      product={product}
      offers={product.offers}
      variants={product.variants}
    />
  );
};

export default ProductPage;
