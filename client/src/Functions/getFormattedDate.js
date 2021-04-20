//   getting the date formatted in mm-dd-yy
export const getFormattedDate = (date) => {
  const dateObj = new Date(date);
  // Since month starts from 0 in js
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return month + "-" + day + "-" + year;
};
