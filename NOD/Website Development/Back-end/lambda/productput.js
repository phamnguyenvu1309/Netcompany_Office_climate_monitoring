'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentCLient = new AWS.DynamoDB.DocumentClient();

    let responseBody = "";
    let statusCode = 0;

    const {id, productName,description,price,category} = JSON.parse(event.body)

    const params = {
        TableName: "product",
        Item: {
            id: id,
            productName: productName,
            description:description,
            price:price,
            category:category
        }
    }

    try{
        const data = await documentCLient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch(err){
        responseBody = `unable to put: ${err}`;
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