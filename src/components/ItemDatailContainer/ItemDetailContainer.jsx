import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { getProductById } from "../../services/productsService";
import { Loader } from "../Loader/Loader";

export const ItemDetailContainer = () => {
  const { id } = useParams();

  const [itemDetail, setItemDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        const item = data.find((item) => String(item.id) === id);
        if (item) {
          setItemDetail(item);
          return;
        }
        throw new Error("Elemento no encontrado");
      })*/
    getProductById(id)
      .then((data) => setItemDetail(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!itemDetail) return <p>Elemento no encontrado</p>;

  return (
    <section>
      <h1>Detalles del producto</h1>
      <div className="products-container">
        <ItemDetail item={itemDetail} />
      </div>
    </section>
  );
};
