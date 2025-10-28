export function getColorForImagesError(errors: { images?: string }) {
  return errors.images ? "error" : "primary";
}
