import { ILink } from './links.model';

export interface IAuteur {
    id: number;
    naam: string;
    links: ILink[];
}
