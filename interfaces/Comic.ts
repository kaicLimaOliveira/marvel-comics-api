export interface MarvelComicData {
  id: string;
  title: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  urls: {
    type: string;
    url: string;
  }[]
}