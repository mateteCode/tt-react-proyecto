export const GENRES = [
  { value: "ficcion", label: "Ficción" },
  { value: "fantasia", label: "Fantasía" },
  { value: "ciencia-ficcion", label: "Ciencia Ficción" },
  { value: "no-ficcion", label: "No Ficción" },
  { value: "desarrollo-personal", label: "Desarrollo Personal" },
];

export const getGenreLabel = (genreValue) => {
  const genre = GENRES.find((g) => g.value === genreValue);
  return genre ? genre.label : genreValue;
};
