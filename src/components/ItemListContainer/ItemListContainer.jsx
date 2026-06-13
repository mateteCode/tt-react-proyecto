import { ItemList } from "../ItemList/ItemList";
import { Loader } from "../Loader/Loader";
import { GenreNav } from "../GenreNav/GenreNav";
import { useProducts } from "../../hooks/useProducts";

export const ItemListContainer = () => {
  const { products, loading, selectedGenre, handleGenreChange } = useProducts();

  if (loading) return <Loader />;

  return (
    <section className="item-list-section">
      <GenreNav currentGenre={selectedGenre} onSelect={handleGenreChange} />
      <ItemList products={products} />
    </section>
  );
};
