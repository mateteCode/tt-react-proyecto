import "./GenreNav.css";

// Definimos los géneros disponibles. "value" vacío para "Todos".
import { GENRES } from "../../utils/genres";

export const GenreNav = ({ currentGenre, onSelect }) => {
  const navGenres = [{ value: "", label: "Todos" }, ...GENRES];

  return (
    <div className="genre-nav">
      {navGenres.map((g) => (
        <button
          key={g.value}
          className={`genre-pill ${currentGenre === g.value ? "active" : ""}`}
          onClick={() => onSelect(g.value)}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
};
