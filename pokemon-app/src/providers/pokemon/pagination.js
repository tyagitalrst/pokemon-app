import { useState } from "react";

function usePagination(data, pageSize, totalPage) {
  const [currentPage, setCurrentPage] = useState(1);

  function currentData() {
    const begin = (currentPage - 1) * pageSize;
    const end = begin + pageSize;
    return data.slice(begin, end);
  }

  function next() {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPage));
  }

  function prev() {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, totalPage));
  }

  return { next, prev, jump, currentData, currentPage, totalPage };
}

export default usePagination;
