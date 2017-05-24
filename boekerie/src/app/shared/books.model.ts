import { IGenre } from './genre.model';
import { IAuteur } from './auteur.model';
import { ILink } from './links.model';
export interface IBook {
    isbn: string;
    titel: string;
    auteur: IAuteur;
    genre: IGenre;
    uitgegeven: number;
    cover: string;
    sterren: number;
    tags: string[];
    links: ILink[];
}
