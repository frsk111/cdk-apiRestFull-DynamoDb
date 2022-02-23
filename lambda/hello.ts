import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
  return {
    statusCode: 200,
    body: `Hello, CDK NEWWW, CIAO CIAO we we we ! You have hit ${event.path}\n`
  };
};
