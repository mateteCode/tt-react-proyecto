import { useParams, useNavigate } from "react-router-dom";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { Loader } from "../Loader/Loader";
import { useProductDetail } from "../../hooks/useProductDetail";

import "./ItemDetailContainer.css";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { itemDetail, loading } = useProductDetail(id);

  if (loading) return <Loader />;
  if (!itemDetail) return <p>Elemento no encontrado</p>;

  return (
    <section>
      <div className="detail-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> Volver
        </button>
        <h1>Detalles del producto</h1>
      </div>
      <div className="products-container">
        <ItemDetail item={itemDetail} />
      </div>
    </section>
  );
};
