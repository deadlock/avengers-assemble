import React, {
  Dispatch,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/card";
import PaginationComponent from "../../components/pagination";
import {
  PageInfo,
  useCalculatePagination,
} from "../../hooks/pagination/pagination.hook";
import {
  handleEditcharacter,
  handleSearchSeries,
} from "../../store/actionCreators";

import "./biography.scss";

const selectedCharacter = (state: RootState) => state.selectedCharacter;
const characterSeries = (state: RootState) => state.series;

const CharacterDetails: React.FC = () => {
  const character = useSelector(selectedCharacter);
  const series = useSelector(characterSeries);
  const dispatch: Dispatch<any> = useDispatch();

  const [editedCharacter, setEditedCharacter] = useState({
    name: "",
    description: "",
  });

  const [editing, setEditing] = useState(false);

  const recordsPerPage = useRef<number>(10);
  const { calculatePagination } = useCalculatePagination(
    recordsPerPage.current
  );
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [actualPage, setPage] = useState(1);

  const handleEdit = () => {
    setEditing((prev) => !prev);
  };

  const handleSave = () => {
    if (character) {
      const edited: Character = {
        ...character,
        name: editedCharacter.name,
        description: editedCharacter.description,
      };
      dispatch(handleEditcharacter(edited));
      setEditing(false);
    }
  };

  const navigateBetweenPages = (page: number) => {
    setPage(page);
    void fetchSeries({
      offset: pages[page - 1].pageOffset,
      limit: recordsPerPage.current,
    });
  };

  const fetchSeries = useCallback(
    (pagination: Pagination) => {
      dispatch(
        handleSearchSeries(
          pagination,
          character || { id: 0, thumbnail: { extension: "", path: "" } }
        )
      );
    },
    [dispatch, character]
  );

  useEffect(() => {
    if (series?.results?.length) {
      const pageInfo = calculatePagination(series?.total);
      setPages(pageInfo);
    }
  }, [series, calculatePagination]);

  useEffect(() => {
    fetchSeries({ limit: 10, offset: 0 });
    setEditedCharacter({
      name: character?.name || "",
      description: character?.description || "",
    });
    window.scroll(0, 0);
  }, [character, fetchSeries]);

  const renderDescription = () => {
    return (
      <div className="character-description">
        {editing ? (
          <div className="character-edition">
            <input
              type="text"
              className="font-style"
              defaultValue={character?.name}
              onChange={(event) => {
                setEditedCharacter((prev) => ({
                  ...prev,
                  name: event.target.value,
                }));
              }}
            />
            <textarea
              rows={10}
              className={["font-style", "text-area"].join(" ")}
              defaultValue={character?.description}
              onChange={(event) => {
                setEditedCharacter((prev) => ({
                  ...prev,
                  description: event.target.value,
                }));
              }}
            />
          </div>
        ) : (
          <div>
            <p className="font-style">
              {character?.name || "NAME UNAVAILABLE"}
            </p>
            <p className="font-style">
              {character?.description || "No description available"}
            </p>
          </div>
        )}
        {editing ? (
          <button onClick={handleSave}>SAVE</button>
        ) : (
          <button onClick={handleEdit}>EDIT</button>
        )}
      </div>
    );
  };

  useEffect(() => {
    console.log("pages", pages);
  });

  return (
    <div className="details-wrapper">
      <div className="biography-wrapper">
        <div className="biography-image-wrapper">
          <img
            className="biography-image"
            src={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
            alt={character?.name}
          />
        </div>
        {renderDescription()}
      </div>
      <div className="series-wrapper">
        {series?.results?.length ? (
          series.results.map((serie) => {
            return (
              <div className="series-item-wrapper" key={serie.id}>
                <Card
                  id={+serie.id}
                  path={serie.thumbnail.path}
                  extension={serie.thumbnail.extension}
                />
              </div>
            );
          })
        ) : (
          <p className="font-style">This character doesn't have series</p>
        )}
      </div>
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

export default CharacterDetails;
