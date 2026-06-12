export const ProductFormUI = ({
  product,
  errors,
  loading,
  onChange,
  onFileChange,
  onSubmit,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>Agregar nuevo producto</h2>
        <div>
          <label>Título:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={onChange}
            required
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            name="author"
            value={product.author}
            onChange={onChange}
            required
          />
          {errors.author && <p className="error">{errors.author}</p>}
        </div>
        <div>
          <label>Descripción:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={onChange}
            required
            rows={5}
            placeholder="Escribe la descripción del producto aquí..."
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>
        <div>
          <label>Año:</label>
          <input
            type="number"
            name="year"
            value={product.year}
            onChange={onChange}
            min="0"
            required
          />
          {errors.year && <p className="error">{errors.year}</p>}
        </div>
        <div>
          <label>Género:</label>
          <select
            name="genre"
            value={product.genre}
            onChange={onChange}
            required
          >
            <option value="">Selecciona un género...</option>
            <option value="ficcion">Ficción</option>
            <option value="fantasia">Fantasía</option>
            <option value="ciencia-ficcion">Ciencia Ficción</option>
            <option value="no-ficcion">No Ficción</option>
            <option value="desarrollo-personal">Desarrollo Personal</option>
          </select>
          {errors.genre && <p className="error">{errors.genre}</p>}
        </div>
        <div>
          <label>Precio:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={onChange}
            min="0"
            required
          />
          {errors.price && <p className="error">{errors.price}</p>}
        </div>
        <div>
          <label>Portada:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={onFileChange}
            required
          />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>
        <div>
          <label>Páginas:</label>
          <input
            type="number"
            name="pages"
            value={product.pages}
            onChange={onChange}
            min="0"
            required
          />
          {errors.pages && <p className="error">{errors.pages}</p>}
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </button>

        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </section>
  );
};
