import { handlerPath } from '@libs/handler-resolver';

export const getListFilms = {
    handler: `${handlerPath(__dirname)}/handler.getListFilms`,
    events: [
        {
            http: {
                method: 'get',
                path: 'films/',
            },
        },
    ],
};

export const getFilm = {
    handler: `${handlerPath(__dirname)}/handler.getFilm`,
    events: [
        {
            http: {
                method: 'get',
                path: 'films/{id}',
            },
        },
    ],
};

export const saveFilm = {
    handler: `${handlerPath(__dirname)}/handler.saveFilm`,
    events: [
        {
            http: {
                method: 'post',
                path: 'films',
            },
        },
    ],
};

export const getDynamoFilms = {
    handler: `${handlerPath(__dirname)}/handler.getDynamoFilms`,
    events: [
        {
            http: {
                method: 'get',
                path: 'films/dynamo/',
            },
        },
    ],
};