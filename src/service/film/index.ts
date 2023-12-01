import dynamoDBClient from "../../model";
import FilmService from "./filmService";

const filmService = new FilmService(dynamoDBClient());
export default filmService;
