import { GENRES } from "../../utils/genres";

import "./ProductFormUI.css";

export const ProductFormUI = ({
  product,
  errors,
  loading,
  isEdit,
  onChange,
  onFileChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <section>
      <form className="product-form" onSubmit={onSubmit}>
        <h2>{isEdit ? "Editar libro" : "Agregar nuevo libro"}</h2>

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
            rows={4}
            placeholder="Escribe la descripción del producto aquí..."
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="row-2">
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
            {GENRES.map((g) => (
              <option key={g.value} value={g.value}>
                {g.label}
              </option>
            ))}
          </select>
          {errors.genre && <p className="error">{errors.genre}</p>}
        </div>

        <div className="row-2">
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
            <label>Stock:</label>
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={onChange}
              min="0"
              required
            />
            {errors.stock && <p className="error">{errors.stock}</p>}
          </div>
        </div>

        <div>
          <label>Portada:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={onFileChange}
            required={!isEdit}
          />
          {errors.file && <p className="error">{errors.file}</p>}
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn outline btn-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>

        {errors.general && <p className="error">{errors.general}</p>}
      </form>
    </section>
  );
};
