'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentCLient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {id}=event.pathParameters;

    const params = {
        TableName: "product",
        Key: {
            id: id    
        }
    }

    try{
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch(err){
        responseBody = `unable to delete: ${err}`;
        statusCode = 403
    }

    const reponse = {
        statusCode: statusCode,
        headers: {
            'Content-Type': "application/json"
        },
        body: responseBody
    };

    return reponse
};