import { ILink } from './links.model';

export interface IGenre {
    id: number;
    naam: string;
    links: ILink[];
}
