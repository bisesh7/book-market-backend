// If there are multiple genres then we need to format them
export const getFormattedGenre = (unformattedGenre) => {
  const genres = unformattedGenre.split("|");
  let formattedGenre = "";
  genres.forEach((genre, index) => {
    if (index !== genres.length - 1) formattedGenre += genre + ", ";
    else formattedGenre += genre;
  });
  return formattedGenre;
};
