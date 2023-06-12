import logging
import os
import boto3
import json
import requests
from datetime import datetime

def format_enrollment_request(event_body):
    return f"""
    Received fEMR enrollment request.

    Name: {event_body.get("name", "None")}
    Organization: {event_body.get("organization", "None")}
    Website: {event_body.get("website", "None")}
    Message: {event_body.get("message", "None")}

    Click this link to accept or decline this request: https://{os.environ["DOMAIN_NAME"]}/admin/enrollment-requests/?email={event_body.get("email", "None")}

    """


def register_request(event_body):
    enrollment_requests = json.loads(requests.get("http://femr-central-api.us-west-2.elasticbeanstalk.com/enrollment-status/").text)
    latest_request_id = max([request.get("requestid") for request in enrollment_requests])

    data = {
        "requestid": event_body.get("request_id", latest_request_id + 1),
        "lastName": event_body.get("last_name"),
        "firstName": event_body.get("first_name"),
        "email": event_body.get("email"),
        "organization": event_body.get("organization"),
        "role": event_body.get("role"),
        "enrollmentstatus": "Pending",
        "dateCreated": datetime.now(),
        "message": event_body.get("message")
    }

    logging.info(f"Sending enrollment request to fEMR central database: {data}")

    response = requests.post(
        f"http://femr-central-api.us-west-2.elasticbeanstalk.com/enrollment-status/",
        data=data
    )

    logging.info(f"Received response from fEMR central database: {response}")


def subscribe_to_response_topic(sns_client, email):
    filter_policy = {
        "email": [email]
    }

    response = sns_client.subscribe(
        TopicArn=os.environ["RESPONSE_TOPIC_ARN"],
        Protocol='email',
        Endpoint=email,
        Attributes={
            'FilterPolicy': json.dumps(filter_policy)
        }
    )

    logging.info(f"Subscribed {email} to fEMR enrollment topic: {response}")


def lambda_handler(event, context):
    logging.info(f"Received event: {event}")

    event_body = json.loads(event.get("body", "{}"))

    register_request(event_body)
    
    client = boto3.client('sns')
    response = client.publish(
        TargetArn=os.environ["REQUEST_TOPIC_ARN"],
        Subject='fEMR Enrollment Request',
        Message=format_enrollment_request(event_body),
        MessageStructure='string'
    )

    subscribe_to_response_topic(client, event_body.get("email"))

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        'body': str(response)
    }
