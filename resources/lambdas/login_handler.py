import logging
import json
import requests


def lambda_handler(event, context):
    logging.info(f"Received event: {event}")

    event_body = json.loads(event.get("body", "{}"))

    try:
        user = json.loads(requests.get(f"http://femr-central-api.us-west-2.elasticbeanstalk.com/user/{event_body.get('email')}/").text)
    except:
        user = None

    if user is None or user.get("password") != event_body.get("password"):
        is_accepted = False
    else:
        is_accepted = True

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        'body': json.dumps({
            "accepted": str(is_accepted)
        })
    }
