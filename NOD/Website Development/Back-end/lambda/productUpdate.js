'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentCLient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;
    
    const {id, productName} = JSON.parse(event.body);

    const params = {
        TableName: "product",
        Key: {
            id: id
        },
        UpdateExpression: "set productName = :n",
        ExpressionAttributeValues: {
            ":n": productName
        },
        ReturnValues: "UPDATED_NEW"
    }

    try{
        const data = await documentCLient.update(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    } catch(err){
        responseBody = `unable to update: ${err}`;
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