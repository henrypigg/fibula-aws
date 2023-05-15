import logging
import os
import boto3
import json
import requests
from datetime import datetime

def format_enrollment_response(event_body):
    return f"""
    Received fEMR enrollment request.

    Name: {event_body.get("name", "None")}
    Organization: {event_body.get("organization", "None")}
    Website: {event_body.get("website", "None")}
    Message: {event_body.get("message", "None")}

    Click this link to create an account: https://{os.environ["DOMAIN_NAME"]}/makeaccount

    """


def lambda_handler(event, context):
    logging.info(f"Received event: {event}")

    event_body = json.loads(event.get("body", "{}"))
    
    client = boto3.client('sns')
    response = client.publish(
        TargetArn=os.environ["TOPIC_ARN"],
        Subject=f'fEMR Enrollment Request #{event_body.get("requestid")}',
        Message=format_enrollment_response(event_body),
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
