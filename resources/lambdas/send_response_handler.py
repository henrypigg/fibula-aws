import logging
import os
import boto3
import json
import requests
from datetime import datetime

def format_enrollment_response(event_body):
    if event_body.get("response") == "declined":
        return f"""
        Your request to enroll in the fEMR program has been declined.

        Message from fEMR administrators: {event_body.get("message", "None")}
        """
    return f"""
    You have been accepted to the fEMR program!

    Click this link to create an account: https://{os.environ["DOMAIN_NAME"]}/makeaccount
    """


def update_status(event):
    request_id = event.get('pathParameters', {}).get('request_id', '0')
    enrollment_request = json.loads(requests.get(f"http://femr-central-api.us-west-2.elasticbeanstalk.com/enrollment-status/{request_id}").text)

    enrollment_request['enrollmentstatus'] = event.get('body', {}).get("response")

    logging.info(f"Sending enrollment status update to fEMR central database")

    response = requests.post(
        f"http://femr-central-api.us-west-2.elasticbeanstalk.com/enrollment-status/{request_id}",
        data=enrollment_request
    )

    logging.info(f"Received response from fEMR central database: {response}")


def lambda_handler(event, context):
    logging.info(f"Received event: {event}")

    event_body = json.loads(event.get("body", "{}"))

    update_status(event)
    
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
