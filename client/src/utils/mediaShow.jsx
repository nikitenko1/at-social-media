export const imageShow = (src, theme) => {
  return (
    <img
      className="img-thumbnail"
      src={src}
      alt="images"
      style={{ filter: theme ? 'invert(1)' : 'invert(-1)' }}
    />
  );
};
export const videoShow = (src, theme) => {
  return (
    <video
      controls
      className="img-thumbnail"
      src={src}
      alt="video"
      style={{ filter: theme ? 'invert(1)' : 'invert(-1)' }}
    />
  );
};
