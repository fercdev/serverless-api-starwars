import { DocumentClient } from "aws-sdk/clients/dynamodb";
import People from "../../model/People";
import swapi from "swapi-node";
import { translateAttributes } from "../../libs/translateAttributes";

export default class PeopleService {

    constructor(private docClient: DocumentClient) {
    }

    async getPeople(): Promise<any> {
        const swapiPeople = await swapi.people();
        const people = translateAttributes(swapiPeople);
        return people as People[];
    }

    async getPeopleById(id: string): Promise<any> {
        const swapiPeopleById = await swapi.people(id);
        const people = translateAttributes(swapiPeopleById);
        return people as People[];
    }
}