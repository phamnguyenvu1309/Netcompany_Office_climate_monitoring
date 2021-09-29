'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentCLient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const params = {
        TableName: "product"
    }

    try{
        const data = await documentCLient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;
    } catch(err){
        responseBody = `unable to get: ${err}`;
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