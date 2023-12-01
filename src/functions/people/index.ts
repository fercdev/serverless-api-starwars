import { handlerPath } from '@libs/handler-resolver';

export const getListPeople = {
    handler: `${handlerPath(__dirname)}/handler.getListPeople`,
    events: [
        {
            http: {
                method: 'get',
                path: 'people/',
            },
        },
    ],
};

export const getPeopleById = {
    handler: `${handlerPath(__dirname)}/handler.getPeopleById`,
    events: [
        {
            http: {
                method: 'get',
                path: 'people/{id}',
            },
        },
    ],
};
