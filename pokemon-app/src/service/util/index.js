export function generateQueryPagination(totalPage, pageSize) {
  let queryPagination = Array(totalPage).fill({
    limit: pageSize,
  });

  return queryPagination.map((query, idx) => {
    return {
      ...query,
      offset: idx * pageSize,
    };
  });
}
