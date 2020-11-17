export interface Author {
  id: number;
  name: string;
  videos: {
    id: number;
    catIds: number[]
    name: string;
  }[];
}