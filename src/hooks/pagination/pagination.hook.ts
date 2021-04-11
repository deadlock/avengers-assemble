import { useCallback } from "react";

export type PaginationHook = {
  calculatePagination: (totalElements: number) => PageInfo[];
};

export type PageInfo = {
  pageNumber: number;
  pageOffset: number;
};

export const useCalculatePagination = (
  recordsPerPage: number
): PaginationHook => {
  const calculatePagination = useCallback(
    (totalElements: number): PageInfo[] => {
      const totalPages = Math.ceil(totalElements / recordsPerPage);
      const pageItems: PageInfo[] = [];
      for (let page = 1; page <= totalPages; page++) {
        let offset = 0;
        if (pageItems.length > 0) {
          const [last] = pageItems.reverse();
          offset = last.pageOffset + recordsPerPage;
        }
        const pageItem: PageInfo = {
          pageNumber: page,
          pageOffset: offset,
        };
        pageItems.push(pageItem);
      }
      return pageItems.sort((a, b) => a.pageNumber - b.pageNumber);
    },
    [recordsPerPage]
  );

  return {
    calculatePagination,
  };
};
