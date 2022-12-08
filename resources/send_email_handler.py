import logging
import os
import boto3

def format_enrollment_request(event):
    return f"""
    Received fEMR enrollment request.

    Email: {event.get("email", "None")}
    Organization: {event.get("organization", "None")}
    Website: {event.get("website", "None")}
    Message: {event.get("message", "None")}

    Click this link to accept or decline this request: LINK_HERE

    """

def lambda_handler(event, context):
    client = boto3.client('sns')
    logging.info(f"Received event: {event}")
    response = client.publish(
        TargetArn=os.environ["TOPIC_ARN"],
        Subject='fEMR Enrollment Request',
        Message=format_enrollment_request(event),
        MessageStructure='string'
    )
    return {
        'statusCode': 200,
        'body': response
    }