export const getNumberFromString = (string) => {
  try {
    return parseInt(string);
  } catch (err) {
    return err;
  }
};
