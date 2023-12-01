import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import filmService from '../../service/film';
import { v4 } from "uuid";

export const getListFilms = middyfy(async (): Promise<APIGatewayProxyResult> => {
    try {
        const films = await filmService.getFilms();
        return formatJSONResponse(films)
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const getFilm = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const film = await filmService.getFilm(id)
        return formatJSONResponse(film);
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const saveFilm = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {

        const id = v4();
        let body = event.body as any;
        const film = await filmService.saveFilm({filmId: id, ...body});
        return formatJSONResponse({film});
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})

export const getDynamoFilms = middyfy(async (): Promise<APIGatewayProxyResult> => {
    const films = await filmService.getDynamoFilms();
    return formatJSONResponse(films as any);
})