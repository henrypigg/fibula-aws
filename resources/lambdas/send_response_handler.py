import logging
import os
import boto3
import json
import requests
from datetime import datetime

def format_enrollment_response(event_body):
    if event_body.get("response") == "Denied":
        return f"""
        Your request to enroll in the fEMR program has been denied.

        Message from fEMR administrators: {event_body.get("message", "None")}
        """
    return f"""
    You have been accepted to the fEMR program!

    Click this link to download the installer: https://{os.environ["DOMAIN_NAME"]}/install/mac
    """


def update_status(event):
    request_id = event.get('pathParameters', {}).get('requestId', '0')
    enrollment_request = json.loads(requests.get(f"http://femr-central-api.us-west-2.elasticbeanstalk.com/enrollment-status/{request_id}/").text)

    enrollment_request['enrollmentstatus'] = json.loads(event.get("body", "{}")).get("response")

    logging.info(f"Sending enrollment status update to fEMR central database")

    response = requests.post(
        f"http://femr-central-api.us-west-2.elasticbeanstalk.com/enrollment-status/{request_id}/",
        data=enrollment_request
    )

    logging.info(f"Received response from fEMR central database: {response.text}")
    
    return enrollment_request['email']


def lambda_handler(event, context):
    logging.info(f"Received event: {event}")

    event_body = json.loads(event.get("body", "{}"))

    email = update_status(event)
    
    client = boto3.client('sns')
    response = client.publish(
        TargetArn=os.environ["RESPONSE_TOPIC_ARN"],
        Subject=f'fEMR Enrollment Request #{event_body.get("requestId")}',
        Message=format_enrollment_response(event_body),
        MessageStructure='string',
        MessageAttributes={
            'email': {
                'DataType': 'String',
                'StringValue': email
            }
        }
    )
    
    print(response)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        'body': str(response)
    }
