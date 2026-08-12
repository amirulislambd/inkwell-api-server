type IOption = {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  orderBy?: string;
};
const paginationSortingHelper = (options: IOption) => {
  const page: number = Number(options.page) || 1;
  const limit: number = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy: string = options.sortBy || "createdAt";
  const orderBy: string = options.orderBy || "desc";

  return {
    page,
    limit,
    skip,
    sortBy,
    orderBy,
  };
};

export default paginationSortingHelper;
