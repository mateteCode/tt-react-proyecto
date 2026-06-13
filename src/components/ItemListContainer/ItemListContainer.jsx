import { useEffect, useState } from "react";
//import { useParams } from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { getProducts } from "../../services/productsService";
import { Loader } from "../Loader/Loader";
import { GenreNav } from "../GenreNav/GenreNav";

export const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  //const { genre } = useParams();

  const [selectedGenre, setSelectedGenre] = useState(() => {
    return localStorage.getItem("selectedGenre") || "";
  });

  useEffect(() => {
    setLoading(true);

    /*fetch("/data/products.json")
      .then((response) => response.json())*/

    getProducts(selectedGenre)
      .then((data) => setProducts(data))
      .catch((error) => console.log("Hubo un error", error))
      .finally(() => setLoading(false));
  }, [selectedGenre]);

  const handleGenreChange = (newGenre) => {
    setSelectedGenre(newGenre);
    localStorage.setItem("selectedGenre", newGenre);
  };

  if (loading) return <Loader />;
  return (
    <section style={{ paddingTop: "2rem" }}>
      {/* Colocamos el submenú de pills */}
      <GenreNav currentGenre={selectedGenre} onSelect={handleGenreChange} />

      <ItemList products={products} />
    </section>
  );
};
