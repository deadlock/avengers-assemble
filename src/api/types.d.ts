declare type Result<T> = {
  results: T[] | undefined;
  total: number;
};

declare type Pagination = {
  offset: number;
  limit: number;
};

declare type Query = {
  name: string;
};

declare type CharactersResponse = {
  data: Result<Character>;
};

declare type SeriesResponse = {
  data: Result<Serie>;
};

declare type CharacterBiography = {
  name: string;
  description: string;
  thumbnail: {
    path: string;
    extension: string;
  };
};

declare type CharacterResponse = {
  data: {
    results: CharacterBiography[];
  };
};
