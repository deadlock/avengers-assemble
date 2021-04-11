import React, {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";

import List from "../../components/list/list";
import PaginationComponent from "../../components/pagination";

import "./characters.scss";
import {
  PageInfo,
  useCalculatePagination,
} from "../../hooks/pagination/pagination.hook";

import { handleSearch } from "../../store/actionCreators";

const selectData = (state: RootState) => state.data;

const Character: React.FC = () => {
  const data = useSelector(selectData);
  const dispatch: Dispatch<any> = useDispatch();

  const recordsPerPage = useRef<number>(20);
  const { calculatePagination } = useCalculatePagination(
    recordsPerPage.current
  );
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [actualPage, setPage] = useState(1);

  const navigateBetweenPages = (page: number) => {
    setPage(page);
    void fetchCharacters({
      offset: pages[page - 1].pageOffset,
      limit: recordsPerPage.current,
    });
  };

  const fetchCharacters = useCallback(
    (pagination: Pagination) => {
      dispatch(handleSearch("", pagination));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchCharacters({ limit: recordsPerPage.current, offset: 0 });
  }, [fetchCharacters]);

  useEffect(() => {
    if (data.results?.length) {
      const pageInfo = calculatePagination(data.total);
      setPages(pageInfo);
    }
  }, [data, calculatePagination]);

  return (
    <div className="characters-wrapper">
      <List data={data?.results || []} />
      <div className="pagination-wrappper">
        <PaginationComponent
          count={pages.length}
          currentPage={actualPage}
          onChange={(page) => navigateBetweenPages(page)}
        />
      </div>
    </div>
  );
};

export default Character;
