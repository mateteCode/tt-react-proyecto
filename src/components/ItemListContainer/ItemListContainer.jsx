import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { getProducts } from "../../services/productsService";
import { Loader } from "../Loader/Loader";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { genre } = useParams();

  useEffect(() => {
    //setLoading(true);

    /*fetch("/data/products.json")
      .then((response) => response.json())*/

    getProducts(genre)
      .then((data) => setProducts(data))
      .catch((error) => console.log("Hubo un error", error))
      .finally(() => setLoading(false));
  }, [genre]);

  if (loading) return <Loader />;
  return (
    <section>
      <ItemList products={products} />
    </section>
  );
};
