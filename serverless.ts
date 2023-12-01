import type { AWS } from '@serverless/typescript';
import { getListFilms, getFilm, saveFilm, getDynamoFilms} from '@functions/films';
import { getListPeople, getPeopleById } from '@functions/people'

const serverlessConfiguration: AWS = {
  service: 'serverless-api-starwars',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    memorySize: 3008,
    timeout: 30,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    tracing: {
      lambda: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    iam: {
      role: {
        statements: [{
          Effect: "Allow",
          Action: [
            "dynamodb:DescribeTable",
            "dynamodb:Query",
            "dynamodb:Scan",
            "dynamodb:GetItem",
            "dynamodb:PutItem",
            "dynamodb:UpdateItem",
            "dynamodb:DeleteItem",
          ],
          Resource: "arn:aws:dynamodb:us-east-1:520809732982:table/filmsTable",
        }
        ]
      }
    }
  },
  // import the function via paths
  functions: { getListFilms, getFilm, saveFilm, getDynamoFilms, getListPeople, getPeopleById },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    dynamodb:{
      start:{
        port: 5000,
        inMemory: true,
        migrate: true,
      },
      stages: "dev"
    }
  },
  resources: {
    Resources: {
      filmsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "filmsTable",
          AttributeDefinitions: [{
            AttributeName: "filmId",
            AttributeType: "S",
          }],
          KeySchema: [{
            AttributeName: "filmId",
            KeyType: "HASH"
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
          },
          
        }
      }
    }
  }
};

module.exports = serverlessConfiguration;
