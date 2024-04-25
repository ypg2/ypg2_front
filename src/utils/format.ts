export const formatSlicePagination = (
  sliceStart: number,
  paginationArr: number[]
) => {
  return paginationArr.slice(sliceStart, sliceStart + 5);
};
