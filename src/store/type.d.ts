declare type RootState = {
  data: Result<Character>;
  selectedCharacter?: Character;
  series?: Result<Serie>;
};

declare type Thumbnail = {
  path: string;
  extension: string;
};

declare type Character = {
  id: number;
  name?: string;
  description?: string;
  thumbnail: Thumbnail;
};

declare type Serie = {
  id: string;
  name: string;
  thumbnail: Thumbnail;
};

declare type CharacterAction = {
  type: string;
  selectedCharacter?: Character;
  characters?: Result<Character>;
  series?: Result<Serie>;
};

type DispatchType = (args: CharacterAction) => CharacterAction;
