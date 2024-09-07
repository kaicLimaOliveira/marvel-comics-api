export interface MarvelCharacterData  {
  id: string;
  name: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    type: string;
    url: string;
  }[];
}