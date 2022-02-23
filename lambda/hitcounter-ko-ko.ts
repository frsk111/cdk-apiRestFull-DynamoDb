import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { Lambda } from '@aws-sdk/client-lambda';
import { APIGatewayProxyHandler } from 'aws-lambda'; 

const dynamo = new DynamoDB({});
const lambda = new Lambda({});

//public async findAll(): Promise<IresponseTest1[]> {
//export const handler: APIGatewayProxyHandler = async function(event){
//export const handler = async function(event: { path: any; }){
//export const handler: APIGatewayProxyHandler = async function(event){
export const handler: APIGatewayProxyHandler = async (event) => { 

    console.log('da quì è passato !');
    
    
    await dynamo.updateItem({
        TableName: process.env.HITS_TABLE_NAME,
        Key: { path: { S: event.path } },
        UpdateExpression: 'ADD hits :incr',
        ExpressionAttributeValues: { ':incr': { N: '1' } }
    });

    const resp = await lambda.invoke({
        FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
        Payload: Buffer.from(JSON.stringify(event)),
    });

    return JSON.parse(Buffer.from(resp.Payload!).toString());  

}

