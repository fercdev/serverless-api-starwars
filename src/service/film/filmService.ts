import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Film from "../../model/Film";
import swapi from "swapi-node";
import { translateAttributes } from "../../libs/translateAttributes";

export default class FilmService {

    private Tablename: string = "filmsTable";
    constructor(private docClient: DocumentClient) {

    }

    async getFilms(): Promise<any> {
        const swapiFilms = await swapi.films();
        const film = translateAttributes(swapiFilms);
        return film as Film[];
    }

    async getFilm(id: string): Promise<any> {
        const swapiFilmById = await swapi.films(id);
        const film = translateAttributes(swapiFilmById);
        return film as Film[];
    }

    async saveFilm(film: any): Promise<Film> {
        await this.docClient.put({
            TableName: this.Tablename,
            Item: film
        }).promise()
        return film as Film;
    }

    async getDynamoFilms(): Promise<Film[]> {
        const films = await this.docClient.scan({
            TableName: this.Tablename,
        }).promise()
        console.log("dynamoResponse:", films);
        console.log("dynamoResponseITEMS:", films.Items);
        const translatedAttributesFilms = translateAttributes(films);
        return translatedAttributesFilms as Film[];
    }
}