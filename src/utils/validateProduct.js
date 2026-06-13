export const validateProduct = (product, isEdit = false) => {
  const errors = {};

  if (!product.title?.trim()) errors.title = "El título es obligatorio";
  if (!product.author?.trim()) errors.author = "El autor es obligatorio";
  if (!product.description?.trim())
    errors.description = "La descripción es obligatoria";
  if (!product.year) errors.year = "El año es obligatorio";
  if (!product.genre?.trim()) errors.genre = "El género es obligatorio";
  if (!product.price || product.price <= 0)
    errors.price = "El precio es obligatorio y debe ser mayor a 0";
  if (!isEdit && !product.file)
    errors.file = "La imagen de portada es obligatoria";
  if (!product.pages || product.pages <= 0)
    errors.pages = "El número de páginas es obligatorio y debe ser mayor a 0";
  if (!product.stock || product.stock < 0)
    errors.stock =
      "El número de stock es obligatorio y debe ser un valor positivo";

  return errors;
};
