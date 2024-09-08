export interface MarvelComicData {
  id: number;
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