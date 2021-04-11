import React from "react";
import { useHistory } from "react-router";

import "./card.scss";

interface CardProps {
  id: number;
  name?: string;
  path: string;
  extension: string;
}

const Card: React.FC<CardProps> = ({ id, name, path, extension }) => {
  const history = useHistory();
  return (
    <div
      className="card-wrapper"
      onClick={() => history.push(`/biography/${id}`)}
    >
      <div className="card-inner-wrapper">
        {path && (
          <img
            className="card-character-image"
            src={`${path}.${extension}`}
            alt={`${name}`}
          />
        )}
        {name && (
          <div className="card-character-name-wrapper">
            <h4 className="card-character-name">{name}</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
