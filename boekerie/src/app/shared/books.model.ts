import { IGenre } from './genre.model';
import { IAuteur } from './auteur.model';

export interface IBook {
    isbn: string;
    titel: string;
    genre: IGenre;
    auteur: IAuteur;
    cover?: string;
    uitgegeven: number;
    prijs: number;
    tags: string[];
    sterren: number;
}
