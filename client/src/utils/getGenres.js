/**
 * @param   books
 * @returns the list of all the genres in the book list
 */
export const getGenres = (books) => {
  // Get only genres from the books list with different genres
  const genresInBooksList = books.map((book) => book.genre);

  //   Set of genres
  const genres = [];

  // Function to add genre to the genres list if the genre is not in the list
  const addToGenres = (genre) => {
    if (!genres.includes(genre)) {
      genres.push(genre);
    }
  };

  genresInBooksList.forEach((genreInBooksList) => {
    //   If a book has multiple genres, genres are seperated with |
    if (genreInBooksList.includes("|")) {
      const splittedGenres = genreInBooksList.split("|");
      //   We add each splitted genres to the genre set
      splittedGenres.forEach((genre) => {
        addToGenres(genre);
      });
    } else {
      addToGenres(genreInBooksList);
    }
  });

  return genres;
};
