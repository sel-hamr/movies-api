export const validateQueryGetMovies = (query) => {
  const { limit, page, orderBy, sortBy } = query;
  console.log(orderBy);
  if (
    parseInt(page) === NaN ||
    parseInt(orderBy) === NaN ||
    limit < 1 ||
    page < 1 ||
    ![1, -1].includes(parseInt(orderBy)) ||
    !["id", "name", "language", "status", "runtime", "weight"].includes(sortBy)
  ) {
    return false;
  }
  return true;
};
