import { ILink, IBook, IGenre, IAuteur } from './index';

export interface IResult<T> {
  value: T[];
  link: ILink[];
}
