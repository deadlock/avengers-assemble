import React, { Dispatch } from "react";
import Card from "../card/card";

import { handleSelectedCharacter } from "../../store/actionCreators";

import "./list.scss";
import { useDispatch } from "react-redux";

interface ListProps {
  data: {
    id: number;
    name?: string;
    thumbnail: {
      path: string;
      extension: string;
    };
  }[];
}

const List: React.FC<ListProps> = ({ data }) => {
  const dispatch: Dispatch<any> = useDispatch();

  return (
    <div className="list-wrapper">
      <div className="list-inner-wrapper">
        {data.map((item) => {
          return (
            <div
              className="list-item-wrapper"
              key={item.id}
              onClick={() => dispatch(handleSelectedCharacter(item))}
            >
              <Card
                id={item.id}
                name={item.name}
                path={item.thumbnail.path}
                extension={item.thumbnail.extension}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
