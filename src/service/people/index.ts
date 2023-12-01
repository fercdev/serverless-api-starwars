import dynamoDBClient from "../../model";
import PeopleService from "./peopleService";

const peopleSevice = new PeopleService(dynamoDBClient());
export default peopleSevice;
