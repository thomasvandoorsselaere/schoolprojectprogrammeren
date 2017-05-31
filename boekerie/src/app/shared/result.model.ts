import { ILink } from './index';

export interface IResult<T> {
  value: T[];
  link: ILink[];
}
