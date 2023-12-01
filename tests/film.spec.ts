// starting
import { MockProxy, mock } from 'jest-mock-extended';
import { APIGatewayProxyEvent, Context} from "aws-lambda";
//APIGatewayProxyResult, APIGatewayEvent
import { getListFilms } from '../src/functions/films/handler';
import { middyfy } from '../src/libs/lambda';

describe('Test films lambda functions', () => {
    let event:   MockProxy<APIGatewayProxyEvent>;
    let context: MockProxy<Context>;

    beforeEach(()=>{
        context = mock<Context>();
        event   = mock<APIGatewayProxyEvent>();
    });

    test('should get Response success Object', async() => {
        event.queryStringParameters = {};

        const res : any = await getListFilms(event, context);
        expect(res.statusCode).toEqual(200);
    })
})