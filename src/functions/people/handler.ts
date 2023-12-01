import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import peopleService from '../../service/people';

export const getListPeople = middyfy(async (): Promise<APIGatewayProxyResult> => {
    try {
        const films = await peopleService.getPeople();
        return formatJSONResponse(films)
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const getPeopleById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const film = await peopleService.getPeopleById(id)
        return formatJSONResponse(film);
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})