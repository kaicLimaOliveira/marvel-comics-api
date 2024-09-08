export interface MarvelCharacterData  {
  id: number;
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