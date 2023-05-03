import logging
import os
import boto3
import json

def format_enrollment_request(event_body):
    return f"""
    Received fEMR enrollment request.

    Email: {event_body.get("email", "None")}
    Organization: {event_body.get("organization", "None")}
    Website: {event_body.get("website", "None")}
    Message: {event_body.get("message", "None")}

    Click this link to accept or decline this request: LINK_HERE

    """

def lambda_handler(event, context):
    print(event)
    client = boto3.client('sns')
    logging.info(f"Received event: {event}")
    response = client.publish(
        TargetArn=os.environ["TOPIC_ARN"],
        Subject='fEMR Enrollment Request',
        Message=format_enrollment_request(json.loads(event.get("body", "{}"))),
        MessageStructure='string'
    )
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        'body': str(response)
    }