import { useParams } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { Loader } from "../Loader/Loader";
import { useProductDetail } from "../../hooks/useProductDetail";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const { itemDetail, loading } = useProductDetail(id);

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
